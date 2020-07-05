import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreatePostBodyDto, CreatePostSuccessDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiBearerAuth()
  @Personal() //provides @UserObjectID to get userid
  @Post()
  createPost(@Body() createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
    console.log("*** " + createPostDto + " ***");
    return this.postsService.createPost(author, createPostDto);
  }
}