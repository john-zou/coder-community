import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { ConversationModel, MessageModel, UserModel } from "../mongoModels";
import { convertToStrArr } from "../util/helperFunctions";
import { CreateMessageBodyDto } from "./messages.dto";
import { MessagesService } from "./messages.service";
import { CreateConversationBodyDto } from '../conversations/conversation.dto';
import { PersonalWs } from '../auth/guards/personal-ws.decorator';
import { ConversationsService } from '../conversations/conversations.service';
import { UserObjectID } from '../user/user-object-id.decorator';
import { NewConversationClientToServerDto, NewConversationServerToClientDto } from './messenger.ws.dto';
import { UserWsAuthGuard } from '../auth/guards/user-ws.guard';
import {
  CCEditorDeleteDto,
  CCEditorDeleteEvent,
  CCEditorInsertDto,
  CCEditorInsertEvent,
  CCMousePositionChangeDto,
  CCMousePositionChangeEvent, DefaultCode,
  JoinCCClientToServerDto,
  JoinCCEvent, JoinCCServerToClientDto
} from "./code-collab.ws.dto";

@WebSocketGateway() //by default server already serves at 3001
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {//gateway===controller
  @WebSocketServer()
  wss: Server;

  private readonly mapUserIDToClientID: Record<string, Set<Socket>> = {};
  private readonly mapClientIDToUserID: Record<string, string> = {};
  readonly roomIDToCode: Record<string, string> = {}

  constructor(private readonly messagesService: MessagesService, private readonly conversationsService: ConversationsService) { }
  private logger = new Logger('MessageGateway');

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ID ${client.id}`);
    client.emit('connection', 'suscessfully connected to server');//send to the client
  }

  handleDisconnect(client: Socket): any {
    const userID = this.mapClientIDToUserID[client.id];
    if (this.mapClientIDToUserID[userID]) {
      this.mapUserIDToClientID[userID].delete(client);
    }
  }

  @SubscribeMessage(CCMousePositionChangeEvent)
  onMousePositionChangeEvent(@MessageBody() dto: CCMousePositionChangeDto, @ConnectedSocket() client: Socket): void {
    const room = dto.roomID
    // notify other people in the room
    client.to(room).emit(CCMousePositionChangeEvent, dto)
  }

  @SubscribeMessage(CCEditorInsertEvent)
  onCCEditorInsertEvent(@MessageBody() dto: CCEditorInsertDto, @ConnectedSocket() client: Socket): void {
    const room = dto.roomID

    // Two corner cases
    if (dto.text === DefaultCode) {
      return
    }
    if (dto.text === this.roomIDToCode[room]) {
      return
    }

    const oldCode = this.roomIDToCode[room]
    this.roomIDToCode[room] = oldCode.slice(0, dto.index) + dto.text + oldCode.slice(dto.index)

    client.to(room).emit(CCEditorInsertEvent, dto)
  }

  @SubscribeMessage(CCEditorDeleteEvent)
  onCCEditorDeleteEvent(@MessageBody() dto: CCEditorDeleteDto, @ConnectedSocket() client: Socket): void {
    const room = dto.roomID

    const oldCode = this.roomIDToCode[room]
    this.roomIDToCode[room] = oldCode.slice(0, dto.index) + oldCode.slice(dto.index + dto.length)

    client.to(room).emit(CCEditorDeleteEvent, dto)
  }

  @SubscribeMessage(JoinCCEvent)
  onJoinCC(@MessageBody() dto: JoinCCClientToServerDto, @ConnectedSocket() client: Socket): WsResponse<JoinCCServerToClientDto> {
    const room = dto.roomID
    client.join(room)

    if (this.roomIDToCode[room]) {
      return {
        event: JoinCCEvent,
        data: {
          code: this.roomIDToCode[room]
        }
      }
    } else {
      this.roomIDToCode[room] = DefaultCode
      return {
        event: JoinCCEvent,
        data: {
          code: this.roomIDToCode[room]
        }
      }
    }
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage('authenticate')
  async acknowledgeAuthentication(@ConnectedSocket() socket: Socket, @UserObjectID() userID: string): Promise<WsResponse<null>> {
    this.mapClientIDToUserID[socket.client.id] = userID;

    const user = await UserModel.findById(userID);
    const conversations = user.conversations;
    for (const convID of conversations) {
      socket.join(convID.toString());
    }
    if (!this.mapUserIDToClientID[userID]) {
      this.mapUserIDToClientID[userID] = new Set<Socket>();
      this.mapUserIDToClientID[userID].add(socket);
    } else {
      this.mapUserIDToClientID[userID].add(socket);
    }

    return {
      event: 'authenticate',    // Front end waits for this event before requesting data
      data: null,
    };
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage('getConversationsAndUsers')
  async sendConversationsAndUsers(@ConnectedSocket() client: Socket, @UserObjectID() userID: string): Promise<WsResponse<{ users, conversations }>> {
    const user = await UserModel.findById(userID).lean();
    const conversations = await ConversationModel.find({ _id: { $in: user.conversations } }).lean();
    const userIDs = [];
    conversations.forEach(conversation => {
      conversation.users.forEach(user => userIDs.push(user));
      //@ts-ignore
      conversation.users = convertToStrArr(conversation.users);
      //@ts-ignore
      conversation.messages = convertToStrArr(conversation.messages);
    });
    //get user's following and followers
    userIDs.push(...user.followers);
    userIDs.push(...user.following);
    const users = await UserModel.find({ _id: { $in: userIDs } }).lean();
    users.forEach(user => {
      //@ts-ignore
      user.conversations = convertToStrArr(user.conversations);
      //@ts-ignore
      //fetch all following and followers as well since they have existing conversations with user
      user.followers = convertToStrArr(user.followers);
      //@ts-ignore
      user.following = convertToStrArr(user.following);
    });
    const ret =  {
      event: 'getConversationsAndUsers',
      data: {
        users, conversations
      }
    };
    this.logger.log(ret);
    return ret;
  }

  @SubscribeMessage('newMessage')
  async handleNewMessage(@MessageBody() createMessageBodyDto: CreateMessageBodyDto, @ConnectedSocket() client: Socket,): Promise<any> {//when event is received,
    // this.logger.log("received: " + createMessageBodyDto + "from " + client.id);
    console.log("convesation id in gateway: " + createMessageBodyDto.conversationID);
    const { _id } = await this.messagesService.createMessage(createMessageBodyDto, createMessageBodyDto.userID, createMessageBodyDto.conversationID);
    //broadcast to all clients except user
    client.to(createMessageBodyDto.conversationID).emit('newMessage', {
      conversationID: createMessageBodyDto.conversationID,
      author: createMessageBodyDto.userID,
      _id,
      text: createMessageBodyDto.text,
      createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
    });

    return { //return sends back res to only user (not broadcast)
      event: 'newMessage',
      data: {
        conversationID: createMessageBodyDto.conversationID,
        _id,
        author: createMessageBodyDto.userID,
        id: client.id,
        text: createMessageBodyDto.text,
        createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      }
    }
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage('newConversation')
  async handleCreateNewConversation(@MessageBody() newConversationDto: NewConversationClientToServerDto, @UserObjectID() userID: string, @ConnectedSocket() client: Socket): Promise<WsResponse<NewConversationServerToClientDto>> {
    this.logger.log(newConversationDto);
    const users = [userID, ...newConversationDto.otherUsers];
    const conversation = await this.conversationsService.createConversation({
      name: newConversationDto.name,
      users,
      message: newConversationDto.initialMessage,
      userID,
      createdAt: Date.now(),
    }, userID);

    for (const user of conversation.users) {
      if (this.mapUserIDToClientID[user]) {
        for (const socket of this.mapUserIDToClientID[user]) {
          socket.join(conversation._id);
        }
      }
    }

    const dataForBroadcast: NewConversationServerToClientDto = {
      isCreator: false, conversation
    }

    const dataForClient: NewConversationServerToClientDto = {
      isCreator: true, conversation
    }

    // Modify this when we implement rooms
    client.broadcast.emit('newConversation', dataForBroadcast);

    return { //return sends back res to only user (not broadcast)
      event: 'newConversation',
      data: dataForClient,
    };
  }


}