import { CommentDto } from './getCommentsByPostID.ws.dto';

export const CreateCommentEvent = "createComment";
export const CreateCommentInvalidPostErrorString = "Cannot create comment -- invalid Post ID";
export const CreateCommentInvalidParentCommentErrorString = "Cannot create comment -- invalid parent comment ID";

export class CreateCommentClientToServerDto {
  content: string;
  parentComment?: string;
  parentPost?: string;
  parentVideo?: string;
  commentRoot: string;
}

export class CreateCommentServerToClientDto {
  comment: CommentDto;
}