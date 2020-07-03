import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { GetInitialPostDataDto } from "./dto/posts.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  //to be replaced with actual posts in mongoDB later after create posts is implemented
  @Get()
  getPosts(): Promise<GetInitialPostDataDto[]> {
    return this.postsService.getDevToArticles();
  }
}