import { Controller, Get } from '@nestjs/common';
import { InitialDataDto } from './initialData.dto';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from '../posts/posts.service';
import { UserService } from '../user/user.service';
import { GetInitialPostDataDto } from '../posts/dto/posts.dto';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getTrending(): Promise<GetInitialPostDataDto[]> {
    return this.postsService.getDevToArticles();
  }
}
