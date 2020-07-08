import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiProperty } from '@nestjs/swagger';

import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreatePostBodyDto, CreatePostSuccessDto, PostDetailsDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiBearerAuth()
  @Personal() //provides @UserObjectID to get userid
  @Post()
  createPost(@Body('newPost') createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
  // createPost(@Body('newPost') createPostDto: CreatePostBodyDto) {
    console.log("*** " + createPostDto.content + "  " + createPostDto.title + " ***");
    console.log(author);
    return this.postsService.createPost(author, createPostDto);
  }

  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string): Promise<PostDetailsDto> {
    return this.postsService.getPostBySlug(slug);
  }
}