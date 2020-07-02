// import { ObjectID } from "mongodb";
export class CreatePostDto {
  title: string;
  content: string;
}

export class GetAllPostsDto { //for frontend to render 
  author: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  featuredImg: string;
  likedByUsers: number;
  commentsCount: number;
  comments: string[];
}