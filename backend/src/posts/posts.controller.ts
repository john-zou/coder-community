import { UserService } from './../user/user.service';
import { Body, Controller, Post, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreatePostBodyDto, CreatePostSuccessDto, GetPostDetailsSuccessDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
    private readonly userService: UserService) { }

  @ApiBearerAuth()
  @Personal() //provides @UserObjectID to get userid
  @Post()
  createPost(@Body() createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
    return this.postsService.createPost(author, createPostDto);
  }

  @Get(':slug')
  @UsePipes(new ValidationPipe({transform: true}))
  async getPostBySlug(@Param('slug') slug: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
    const post = await this.postsService.getPostBySlug(slug);
    if (getAuthor) {
      const author = await this.userService.findUserById(post.author);
      return { post, author };
    } else {
      return { post }
    }
  }
}