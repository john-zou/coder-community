import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PersonalWs } from '../auth/guards/personal-ws.decorator';
import {
  GetCommentsByPostIDEvent,
  GetCommentsClientToServerDto,
  GetCommentsServerToClientDto,
} from './dto/getCommentsByPostID.ws.dto';
import { PostModel } from '../mongoModels';
import { ObjectID } from 'mongodb';
import {
  commentIDsToCommentDtoArr,
  createComment,
  deleteComment,
  fetchAuthorsForComments,
  likeComment,
  unlikeComment,
} from './comments.helpers';
import { UserObjectID } from '../user/user-object-id.decorator';
import {
  CreateCommentClientToServerDto,
  CreateCommentEvent,
  CreateCommentServerToClientDto,
} from './dto/createComment.ws.dto';
import {
  DeleteCommentClientToServerDto,
  DeleteCommentEvent,
  DeleteCommentServerToClientDto,
} from './dto/deleteComment.ws.dto';
import {
  UnlikeCommentClientToServerDto,
  UnlikeCommentEvent,
  UnlikeCommentServerToClientDto,
} from './dto/unlikeComment.ws.dto';
import { LikeCommentClientToServerDto, LikeCommentEvent, LikeCommentServerToClientDto } from './dto/likeComment.ws.dto';
import { UserWsAuthGuard } from '../auth/guards/user-ws.guard';

@WebSocketGateway()
export class CommentsGateway implements OnGatewayConnection {
  private readonly logger = new Logger('CommentsGateway');

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(client: Socket): any {
    this.logger.log(`Client connected: ID ${client.id}`);
  }

  @SubscribeMessage(GetCommentsByPostIDEvent)
  async getCommentsByPostID(@MessageBody() { postID }: GetCommentsClientToServerDto): Promise<WsResponse<GetCommentsServerToClientDto>> {
    this.logger.log(GetCommentsByPostIDEvent);
    const post = await PostModel.findById(postID, {comments: 1}).lean() as {_id: ObjectID, comments: ObjectID[]};
    const comments = await commentIDsToCommentDtoArr(post.comments);
    const authorIDsToFetch: Record<string, boolean> = {};
    comments.forEach(comment => {
      authorIDsToFetch[comment.author] = true;
    });
    const authors = await fetchAuthorsForComments(authorIDsToFetch);

    return {
      event: GetCommentsByPostIDEvent,
      data: {
        postID,
        comments,
        authors
      }
    }
  }

  @SubscribeMessage('join-post-room')
  joinPostRoom() {
    // TODO (for live updates)
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage(CreateCommentEvent)
  async writeComment(@UserObjectID() userID: string, @MessageBody() createCommentDto: CreateCommentClientToServerDto): Promise<WsResponse<CreateCommentServerToClientDto>> {
    return {
      event: CreateCommentEvent,
      data: await createComment(userID, createCommentDto),
    }
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage(DeleteCommentEvent)
  async deleteComment(@UserObjectID() userID: string, @MessageBody() deleteCommentDto: DeleteCommentClientToServerDto): Promise<WsResponse<DeleteCommentServerToClientDto>> {
    return {
      event: DeleteCommentEvent,
      data: await deleteComment(userID, deleteCommentDto),
    }
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage(LikeCommentEvent)
  async likeComment(@UserObjectID() userID: string, @MessageBody() likeCommentDto: LikeCommentClientToServerDto): Promise<WsResponse<LikeCommentServerToClientDto>> {
    return {
      event: LikeCommentEvent,
      data: await likeComment(userID, likeCommentDto),
    }
  }

  @UseGuards(UserWsAuthGuard)
  @SubscribeMessage(UnlikeCommentEvent)
  async unlikeComment(@UserObjectID() userID: string, @MessageBody() unlikeCommentDto: UnlikeCommentClientToServerDto): Promise<WsResponse<UnlikeCommentServerToClientDto>> {
    return {
      event: LikeCommentEvent,
      data: await unlikeComment(userID, unlikeCommentDto),
    }
  }
}
