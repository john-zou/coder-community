import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostBodyDto, CreatePostSuccessDto } from "./dto/posts.dto";
import { Personal } from "../auth/guards/personal.decorator";
import { UserObjectID } from "../user/user-object-id.decorator";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Personal() //provides @UserObjectID to get userid
  @Post()
  createPost(@Body() createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
    return this.postsService.createPost(author, createPostDto);
  }
}