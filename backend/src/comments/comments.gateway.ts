import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PersonalWs } from '../auth/guards/personal-ws.decorator';
import { GetCommentsClientToServerDto, GetCommentsServerToClientDto } from './comments.ws.dto';
import { CreateMessageBodyDto } from '../messages/messages.dto';
import { CommentModel, PostModel } from '../mongoModels';

@WebSocketGateway()
export class CommentsGateway implements OnGatewayConnection {
  private readonly logger = new Logger('CommentsGateway');

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(client: Socket): any {
    this.logger.log(`Client connected: ID ${client.id}`);
  }

  @SubscribeMessage('getCommentsByPostID')
  async getCommentsByPostID(@MessageBody() dto: GetCommentsClientToServerDto): Promise<WsResponse<GetCommentsServerToClientDto>> {
    const comments = (await PostModel.findById(dto.postID).populate('comments').lean()).comments;
    // TODO

    return {
      event: 'getCommentsByPostID',
      data: {
        // TODO
      }
    }
  }

  @SubscribeMessage('join-post-room')
  joinPostRoom() {

  }

  @PersonalWs()
  @SubscribeMessage('write-comment')
  writeComment() {

  }

  @PersonalWs()
  @SubscribeMessage('delete-comment')
  deleteComment() {

  }
}
