export const LikeCommentEvent = "likeComment";
export const LikeCommentUserAlreadyLikedErrorString = "User already liked this comment";

export class LikeCommentClientToServerDto {
    commentID: string;
}

export class LikeCommentServerToClientDto {
    liked: boolean;
}
