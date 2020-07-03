// import { ObjectID } from "mongodb";
//GET POST DTO
export class PostDto {
  _id: string;
  author: string;
  title: string;
  previewContent?: string;
  content?: string;
  tags: string[];
  featuredImg: string;
  likesCount: number;
  comments?: string[];
  commentsCount: number;
  views: number;
  createdAt: Date;
  likedByUser: boolean;
  slug: string;
  group?: string;
}

//CREATE POST DTO
//request
export class CreatePostBodyDto {
  title: string;
  content: string;
  tags: string[];
  featuredImg: string;
  group?: string;
}

//response
export class CreatePostSuccessDto {
  _id: string;
  slug: string;
}

