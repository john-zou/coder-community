import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ConversationModel, MessageModel, UserModel } from "../mongoModels";
import { convertToStrArr } from "../util/helperFunctions";
import { CreateMessageBodyDto } from "./messages.dto";
import { MessagesService } from "./messages.service";
import { CreateConversationBodyDto } from '../conversations/conversation.dto';
import { PersonalWs } from '../auth/guards/personal-ws.decorator';
import { ConversationsService } from '../conversations/conversations.service';
import { UserObjectID } from '../user/user-object-id.decorator';

@WebSocketGateway() //by default server already serves at 3001
export class MessageGateway implements OnGatewayConnection {//gateway===controller
  @WebSocketServer()
  wss: Server;

  constructor(private readonly messagesService: MessagesService, private readonly conversationsService: ConversationsService) { }
  private logger = new Logger('MessageGateway');

  handleConnection(client: Socket): void {
    this.logger.log('New client connected');
    client.emit('connection', 'suscessfully connected to server');//send to the client
  }

  @SubscribeMessage('getConversationsAndUsers')
  async sendConversationsAndUsers(socket: Socket, userID: string): Promise<WsResponse<{ users, conversations }>> {
    const user = await UserModel.findById(userID).lean();
    const conversations = await ConversationModel.find({ _id: { $in: user.conversations } }).lean();
    const userIDs = [];
    conversations.forEach(conversation => {
      conversation.users.forEach(user => userIDs.push(user))
      //@ts-ignore
      conversation.users = convertToStrArr(conversation.users);
      //@ts-ignore
      conversation.messages = convertToStrArr(conversation.messages);
    });
    const users = await UserModel.find({ _id: { $in: userIDs } }).lean();
    users.forEach(user => {
      //@ts-ignore
      user.conversations = convertToStrArr(user.conversations);
      //@ts-ignore
      //fetch all following and followes as well since they have existing conversations with user
      user.followers = convertToStrArr(user.followers);
      //@ts-ignore
      user.following = convertToStrArr(user.following);
    });

    return {
      event: 'getConversationsAndUsers',
      data: {
        users, conversations
      }
    }
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
  async handleCreateNewConversation(@MessageBody() createConversationBodyDto: CreateConversationBodyDto, @UserObjectID() userID: string, @ConnectedSocket() client: Socket): Promise<any> {
    const { _id } = await this.conversationsService.createConversation(createConversationBodyDto, userID);
    client.broadcast.emit('newConversation', {
      isCreator: false,
      _id, // conversationID
      author: createConversationBodyDto.userID,
      users: createConversationBodyDto.users,
      createdAt: createConversationBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      message: createConversationBodyDto.message,
    });

    return { //return sends back res to only user (not broadcast)
      event: 'newConversation',
      data: {
        isCreator: true,
        _id,
        id: client.id,
        users: createConversationBodyDto.users,
        message: createConversationBodyDto.message,
        createdAt: createConversationBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      }
    }
  }
}