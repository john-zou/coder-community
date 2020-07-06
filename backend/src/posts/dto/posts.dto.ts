// import { ObjectID } from "mongodb";
//GET POST DTO

import { ApiProperty } from "@nestjs/swagger";

//response
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
  createdAt: string;
  likedByUser?: boolean;
  slug: string;
  group?: string;
}

//CREATE POST DTO
//request
export class CreatePostBodyDto {
  @ApiProperty({
    example: 'Hello World'
  })
  title: string;
  @ApiProperty({
    example: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  })
  content: string;
  @ApiProperty({
    description: "the object IDs of the tags",
    example: ['5f00b16372d3a61c90db420c', '5f00b16372d3a61c90db4123']
  })
  tags: string[];
  @ApiProperty({
    example: 'http://dummyimage.com/738x705.bmp/5fa2dd/ffffff'
  })
  featuredImg: string;
  @ApiProperty({
    example: '5f0108270acf2943089347ce'
  })
  group?: string;
}

//response
export class CreatePostSuccessDto {
  _id: string;
  slug: string;
}

