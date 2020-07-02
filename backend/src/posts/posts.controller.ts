import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Header } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { GetAllPostsDto } from "./dto/posts.dto";

@ApiTags('Posts')
@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  //to be replaced with actual posts in mongoDB later after create posts is implemented
  @Get()
  getPostsFromDevTo(): Promise<GetAllPostsDto[]> {
    return this.postsService.getDevToArticles();
  }
}