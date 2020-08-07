export const DeleteCommentEvent = "deleteComment";
export const DeleteCommentInvalidUserErrorString = "Cannot delete comment -- user is not the author";

export class DeleteCommentClientToServerDto {
    commentID: string;
}

export class DeleteCommentServerToClientDto {
    deleted: boolean;
}