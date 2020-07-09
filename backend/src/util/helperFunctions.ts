import { Ref } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";
import { Post } from "../posts/post.schema";
import { PostDto } from "../posts/dto/posts.dto";
import { DocumentType } from '@typegoose/typegoose';

export const convertToStrArr = (list: Ref<any, ObjectID>[]): string[] => {
  return list.map((item) => {
    return item.toString();
  })
}

export const convertPostDocumentToPostDto = (post: DocumentType<Post>): PostDto => {
  return {
    _id: post._id.toString(),
    author: post.author.toString(),
    title: post.title,
    slug: post.slug,
    previewContent: post.previewContent,
    content: post.content,
    tags: convertToStrArr(post.tags),
    createdAt: post.createdAt.toString(),
    featuredImg: post.featuredImg,
    likes: post.likes,
    views: post.views,
    comments: convertToStrArr(post.comments),
    commentsCount: post.comments.length,
  }
}