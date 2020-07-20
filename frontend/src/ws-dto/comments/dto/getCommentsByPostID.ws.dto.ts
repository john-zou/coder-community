export const GetCommentsByPostIDEvent = "getCommentsByPostID";

export class GetCommentsServerToClientDto {
  comments: CommentDto[];
  authors: CommentAuthorDto[];
}

export class GetCommentsClientToServerDto {
  postID: string;
}

export class CommentDto {
  _id: string;
  author: string;
  content: string;
  commentRoot: string;
  replies?: string[];
  likes: number;
  parentPost?: string;
  parentComment?: string;
  parentVideo?: string;
  createdAt: number;
}

export class CommentAuthorDto {
  _id: string;
  userID: string;
  name: string;
  profilePic?: string;
}
