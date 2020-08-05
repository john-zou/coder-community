import { Tag } from '../../tags/tag.schema';
import { Ref } from "@typegoose/typegoose";
// import { ObjectID } from "mongodb";
//GET POST DTO

import { UserDto } from "../../user/dto/user.dto";
import { ApiPropertyOptional } from '@nestjs/swagger';

//response
// This has the content always, for simplicity
export class PostDto {
  _id: string;
  author: string;
  title: string;
  previewContent: string;
  content: string;
  tags: string[];
  featuredImg: string;
  likes: number;
  comments: string[];
  commentsCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  group?: string;
}

export class GetPostsSuccessDto {
  posts: PostDto[]
}

export class PostWithDetails {
  _id: string;
  author: string;
  title: string;
  previewContent: string;
  content: string;
  tags: string[];
  featuredImg: string;
  likes: number;
  comments: string[];
  commentsCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  group?: string;
}

export class GetPostDetailsSuccessDto {
  post: PostWithDetails;
  author?: UserDto;
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

export class UpdatePostSuccessDto {
  _id: string;
  slug: string;
  oldSlug?: string;
  updated?: any
}

// Response
export class GetPostsByTagDto {
  tagID: string;
  posts: PostDto[];
  authors: UserDto[];
}

// Update Request
export class UpdatePostBodyDto {

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  featuredImg?: string;

  @ApiPropertyOptional()
  tags?: string[];

  @ApiPropertyOptional()
  oldSlug?: string;
}
