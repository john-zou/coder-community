// import { ObjectID } from "mongodb";
export class CreatePostDto {
  title: string;
  content: string;
}

//for showing initial posts on the home page
export class GetInitialPostDataDto {
  authorName: string;
  authorImg: string;
  title: string;
  previewContent: string;
  // content: string;
  tags: string[];
  featuredImg: string;
  likes: number;
  comments: number;
  // comments: string[];
  createdAt: Date;
  likedByUser: boolean;
}