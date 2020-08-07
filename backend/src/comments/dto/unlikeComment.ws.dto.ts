export const UnlikeCommentEvent = "unlikeComment";
export const UnlikeCommentDidntLikeErrorString = "User didn't like this comment in the first place";

export class UnlikeCommentClientToServerDto {
    commentID: string;
}

export class UnlikeCommentServerToClientDto {
    unliked: boolean;
}
