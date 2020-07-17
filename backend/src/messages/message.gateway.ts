import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
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

@WebSocketGateway() //by default server already serves at 3001
export class MessageGateway implements OnGatewayConnection {//gateway===controller
  @WebSocketServer()
  wss: Server;getConversationsAndUsers

  constructor(private readonly messagesService: MessagesService, private readonly conversationsService: ConversationsService) { }
  private logger = new Logger('MessageGateway');

  handleConnection(client: Socket): void {
    this.logger.log('New client connected');
    client.emit('connection', 'suscessfully connected to server');//send to the client
  }

  @PersonalWs()
  @SubscribeMessage('authenticate')
  acknowledgeAuthentication(): WsResponse<null> {
    return {
      event: 'authenticate',    // Front end waits for this event before requesting data
      data: null,
    };
  }

  @PersonalWs()
  @SubscribeMessage('getConversationsAndUsers')
  async sendConversationsAndUsers(client: Socket, @UserObjectID() userID: string): Promise<WsResponse<{ users, conversations }>> {
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
    client.broadcast.emit('newMessage', {
      author: createMessageBodyDto.userID,
      _id,
      text: createMessageBodyDto.text,
      createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
    });

    return { //return sends back res to only user (not broadcast)
      event: 'newMessage',
      data: {
        _id,
        author: createMessageBodyDto.userID,
        id: client.id,
        text: createMessageBodyDto.text,
        createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      }
    }
  }



  @PersonalWs()
  @SubscribeMessage('newConversation')
  async handleCreateNewConversation(@MessageBody() newConversationDto: NewConversationClientToServerDto, @UserObjectID() userID: string, @ConnectedSocket() client: Socket): Promise<WsResponse<NewConversationServerToClientDto>> {
    this.logger.log(newConversationDto);
    const users = [userID, ...newConversationDto.otherUsers];
    const conversation = await this.conversationsService.createConversation({
      users,
      message: newConversationDto.initialMessage,
      userID,
      createdAt: Date.now(),
    }, userID);


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