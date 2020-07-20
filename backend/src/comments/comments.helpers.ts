// Helper functions for comments (pure functions)
import { CommentAuthorDto, CommentDto } from './dto/getCommentsByPostID.ws.dto';
import { ObjectID } from 'mongodb';
import { CommentModel, PostModel, UserModel } from '../mongoModels';
import { convertToStrArr } from '../util/helperFunctions';
import {
  CreateCommentClientToServerDto,
  CreateCommentInvalidParentCommentErrorString,
  CreateCommentInvalidPostErrorString,
  CreateCommentServerToClientDto,
} from './dto/createComment.ws.dto';
import {
  DeleteCommentClientToServerDto,
  DeleteCommentInvalidUserErrorString,
  DeleteCommentServerToClientDto,
} from './dto/deleteComment.ws.dto';
import {
  LikeCommentClientToServerDto,
  LikeCommentServerToClientDto,
  LikeCommentUserAlreadyLikedErrorString,
} from './dto/likeComment.ws.dto';
import {
  UnlikeCommentClientToServerDto,
  UnlikeCommentDidntLikeErrorString,
  UnlikeCommentServerToClientDto,
} from './dto/unlikeComment.ws.dto';
import { WsException } from '@nestjs/websockets';
import { CommentRoot } from './comment.schema';

export async function commentIDsToCommentDtoArr(commentIDs: ObjectID[]): Promise<CommentDto[]> {
  const leanComments = await CommentModel.find({_id: {$in: commentIDs}}).lean();
  leanComments.forEach((lc: any) => {
    lc.author = lc.author.toString();
    lc._id = lc._id.toString();
    lc.replies = convertToStrArr(lc.replies);
    lc.createdAt = lc.createdAt.valueOf();
    lc.commentRoot = lc.commentRoot.toString();
    if (lc.parentVideo) {
      lc.parentVideo = lc.parentVideo.toString();
    }
    if (lc.parentPost) {
      lc.parentPost = lc.parentPost.toString();
    }
    if (lc.parentcomment) {
      lc.parentcomment = lc.parentComment.toString();
    }
  })
  return leanComments as unknown as CommentDto[];
}

export async function fetchAuthorsForComments(authorIDsSet: Record<string, boolean>): Promise<CommentAuthorDto[]> {
  const authorIDs = Object.keys(authorIDsSet);
  const leanAuthors = await UserModel.find({_id: {$in: authorIDs}}, { userID: 1, name: 1, profilePic: 1 }).lean() as unknown as Array<{
    _id: ObjectID,
    userID: string,
    name: string,
    profilePic?: string
  }>;

  return leanAuthors.map(user => ({
    _id: user._id.toString(),
    userID: user.userID,
    name: user.name,
    profilePic: user.profilePic
  }));
}

export async function createComment(authorID: string, dto: CreateCommentClientToServerDto): Promise<CreateCommentServerToClientDto> {
  // Find Author doc
  const author = await UserModel.findById(authorID);
  if (!author) {
    throw new WsException("Invalid User ID");
  }

  const comment = new CommentModel();
  comment.author = author;
  comment.commentRoot = dto.commentRoot as CommentRoot;
  comment.content = dto.content;
  comment.likes = 0;

  let root;
  if (dto.commentRoot === CommentRoot.POST.toString()) {
    root = await PostModel.findById(dto.parentPost);
    if (!root) {
      throw new WsException(CreateCommentInvalidPostErrorString);
    }
    comment.parentPost = root;

  } else if (dto.commentRoot === CommentRoot.VIDEO.toString()) {
    // TODO

  } else {
    throw new WsException("Invalid CommentRoot, must be 'post' or 'video'");
  }

  let parentComment;
  if (dto.parentComment) {
    parentComment = await CommentModel.findById(dto.parentComment);
    if (!parentComment) {
      throw new WsException(CreateCommentInvalidParentCommentErrorString);
    }

    comment.parentComment = parentComment;
  }

  await comment.save();
  if (parentComment) {
    parentComment.replies.push(comment);
    await parentComment.save();
  }

  root.comments.push(comment);
  await root.save();

  author.comments.push(comment);
  await author.save();

  const resultDto: CommentDto = {
    _id: comment._id.toString(),
    parentPost: dto.commentRoot === CommentRoot.POST.toString() ? root._id.toString() : undefined,
    parentVideo: dto.commentRoot === CommentRoot.VIDEO.toString() ? "TODO" : undefined,
    parentComment: parentComment?._id.toString(),
    createdAt: comment.createdAt.valueOf(),
    content: comment.content,
    commentRoot: dto.commentRoot,
    author: authorID,
    likes: 0,
  }

  return {
    comment: resultDto,
  }
}

export async function deleteComment(userID: string, { commentID }: DeleteCommentClientToServerDto): Promise<DeleteCommentServerToClientDto> {
  const userOwnsComment = await UserModel.exists({ _id: userID, comments: {$elemMatch: { $eq: new ObjectID(commentID) }} });
  if (!userOwnsComment) {
    throw new WsException(DeleteCommentInvalidUserErrorString);
  }
  // find comment
  const comment = await CommentModel.findById(commentID, {replies: 1, commentRoot: 1, parentPost: 1, parentComment: 1, parentVideo: 1}).lean();
  if (!comment) {
    throw new WsException("Comment doesn't exist");
  }
  const commentIDsToRemove = [comment._id];
  comment.replies?.forEach(reply => commentIDsToRemove.push(reply));

  // remove from each author
  for (const commentID of commentIDsToRemove) {
    const commentForAuthor = await CommentModel.findById(commentID, {_id: 0, author: 1}).lean();
    await UserModel.updateOne({_id: commentForAuthor.author}, {$pull: { comments: commentID }});
  }

  // remove from the post
  if (comment.commentRoot === CommentRoot.POST) {
    //@ts-expect-error
    const res = await PostModel.updateOne({_id: comment.parentPost}, {$pull: { comments: { $in: commentIDsToRemove }}});
    console.log(res);
  } else if (comment.commentRoot === CommentRoot.VIDEO) {
    // TODO
  }

  // remove the comment and its replies
  await CommentModel.deleteMany({_id: {$in: commentIDsToRemove}});
  return {
    deleted: true
  }
}

export async function likeComment(userID: string, dto: LikeCommentClientToServerDto): Promise<LikeCommentServerToClientDto> {
  const user = await UserModel.findById(userID);
  for (const likedComment of user.likedComments) {
    if (likedComment.toString() === dto.commentID) {
      throw new WsException(LikeCommentUserAlreadyLikedErrorString);
    }
  }
  await UserModel.updateOne({_id: userID}, {$push: {likedComments: new ObjectID(dto.commentID)}});
  await CommentModel.updateOne({_id: dto.commentID}, { $inc: {likes: 1} });
  return {
    liked: true
  }
}

export async function unlikeComment(userID: string, dto: UnlikeCommentClientToServerDto): Promise<UnlikeCommentServerToClientDto> {
  const user = await UserModel.findById(userID);
  let didLike = false;
  for (const likedComment of user.likedComments) {
    if (likedComment.toString() === dto.commentID) {
      didLike = true;
      break;
    }
  }
  if (!didLike) {
    throw new WsException(UnlikeCommentDidntLikeErrorString);
  }

  await UserModel.updateOne({_id: userID}, {$pull: {likedComments: new ObjectID(dto.commentID)}});
  await CommentModel.updateOne({_id: dto.commentID}, { $inc: {likes: -1} });
  return {
    unliked: true
  }
}