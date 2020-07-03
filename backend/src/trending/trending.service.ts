import { Injectable, HttpService } from '@nestjs/common';
import { GetInitialDataDto } from './initialData.dto';
import { Personal } from '../auth/guards/personal.decorator';
import { PostsService } from '../posts/posts.service';
import { UserService } from '../user/user.service';

@Personal()
@Injectable()
export class TrendingService {
  constructor(
    private readonly userService: UserService,
    private readonly postsService: PostsService,
    private readonly httpService: HttpService) {
  }

  /**
   * Get the top 5 posts based on:
   * 
   * - Ratio of likes to views, higher the better (if 0 views then score is 0.5)
   * - Tie breaker: most recent
   * - Only in past week
   * 
   * TODO: make this scalable (optimize)
   */

  async getInitialData(userObjectID: string): Promise<GetInitialDataDto> {
    const posts = await this.postsService.getInitialPosts(userObjectID);
    const users = await this.userService.getAuthors(posts);
    return {
      posts,
      users,
    }
  }
}
