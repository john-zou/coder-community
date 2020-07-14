import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Personal } from "../auth/guards/personal.decorator";
import { ConversationModel, MessageModel, UserModel } from "../mongoModels";
import { UserDto } from "../user/dto/user.dto";
import { convertToStrArr } from "../util/helperFunctions";
import { CreateMessageBodyDto } from "./messages.dto";
import { MessagesService } from "./messages.service";

@WebSocketGateway() //by default server already serves at 3001
export class MessageGateway implements OnGatewayConnection {//gateway===controller
  @WebSocketServer()
  wss: Server;

  constructor(private readonly messagesService: MessagesService) { }
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
    const { _id } = await this.messagesService.createMessage(createMessageBodyDto, createMessageBodyDto.userID, createMessageBodyDto.conversationID);
    client.broadcast.emit('newMessage', {
      author: createMessageBodyDto.userID,
      _id,
      text: createMessageBodyDto.text,
      createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
    });

    return { //return sends back res to the sender (not broadcast)
      event: 'newMessage',
      data: {
        author: createMessageBodyDto.userID,
        _id,
        id: client.id,
        text: createMessageBodyDto.text,
        createdAt: createMessageBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      }
    }
  }
}