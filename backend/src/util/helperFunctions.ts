import { Ref, DocumentType } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.schema";
import { Post } from "../posts/post.schema";
import { PostDto } from "../posts/dto/posts.dto";
import * as moment from 'moment';
import { Logger } from '@nestjs/common';

export const convertToStrArr = (list: Ref<any, ObjectID>[]): string[] => {
  return list.map((item) => {
    return item.toString();
  })
}

export const convertUserToUserDto = (user: DocumentType<User>): UserDto => {
  return {
    _id: user._id,
    userID: user.userID,
    name: user.name,
    profilePic: user.profilePic,
    profileBanner: user.profileBanner,
    status: user.status,
    followers: convertToStrArr(user.followers),
    following: convertToStrArr(user.following),
    groups: convertToStrArr(user.groups),
    posts: convertToStrArr(user.posts),
    savedPosts: convertToStrArr(user.savedPosts),
    likedPosts: convertToStrArr(user.likedPosts),
  }
}

export const convertPostDocumentToPostDto = (post: DocumentType<Post>): PostDto => {
  let createdAt: string;
  const dateCopy = new Date(post.createdAt.getTime());
  const nowHours = Date.now() / (1000*60*60);
  const postCreateAtHours = post.createdAt.getTime() / (1000*60*60);
  if (nowHours - postCreateAtHours > 24) {
    createdAt = moment(dateCopy).format('lll'); //https://momentjs.com/
  } else {
    createdAt = moment(dateCopy).fromNow(); //https://momentjs.com/docs/#/displaying/fromnow/
  }
  Logger.log(createdAt, "convertPostDocumentToPostDto");
  return {
    _id: post._id.toString(),
    author: post.author.toString(),
    title: post.title,
    slug: post.slug,
    previewContent: post.previewContent,
    content: post.content,
    tags: convertToStrArr(post.tags),
    createdAt,
    featuredImg: post.featuredImg,
    likes: post.likes,
    views: post.views,
    comments: convertToStrArr(post.comments),
    commentsCount: post.comments.length,
  }
}