import { Tag } from '../../tags/tag.schema';
import {Ref} from "@typegoose/typegoose";
// import { ObjectID } from "mongodb";
//GET POST DTO

import { UserDto } from "../../user/dto/user.dto";
import { ApiPropertyOptional } from '@nestjs/swagger';

//response
export class PostDto {
  _id: string;
  author: string;
  title: string;
  previewContent?: string;
  content?: string;
  tags: string[];
  featuredImg: string;
  likes: number;
  comments: string[];
  commentsCount: number;
  views: number;
  createdAt: string;
  slug: string;
  group?: string;
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
  oldSlug?: string
}

// Response
export class GetPostsByTagDto {
  cursor: number; // so the front end knows what index they are at for retrieving posts by this tag
  tagID: string;
  posts: PostDto[];
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
