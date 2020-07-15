import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateConversationBodyDto } from "./conversation.dto";
import { ConversationsService } from "./conversations.service";

@WebSocketGateway() //by default server already serves at 3001
export class ConversationGateway implements OnGatewayConnection {//gateway===controller
  @WebSocketServer()
  wss: Server;

  constructor(private readonly conversationsService: ConversationsService) { }
  private logger = new Logger('Conversation Gateway');

  handleConnection(client: Socket): void {
    this.logger.log('New client connected');
    client.emit('connection', 'suscessfully connected to server');//send to the client
  }


  @SubscribeMessage('newConversation')
  async handleCreateNewConversation(@MessageBody() createConversationBodyDto: CreateConversationBodyDto, userID: string, @ConnectedSocket() client: Socket): Promise<any> {
    const { _id } = await this.conversationsService.createConversation(createConversationBodyDto, userID);
    client.broadcast.emit('newConversation', {
      _id,
      author: createConversationBodyDto.userID,
      users: createConversationBodyDto.users,
      createdAt: createConversationBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      message: createConversationBodyDto.message,
    });

    return { //return sends back res to only user (not broadcast)
      event: 'newConversation',
      data: {
        _id,
        id: client.id,
        users: createConversationBodyDto.users,
        message: createConversationBodyDto.message,
        createdAt: createConversationBodyDto.createdAt, //this is the id of the pending message which then will be used by the sender to confirm the message has been succesfully sent
      }
    }
  }
}