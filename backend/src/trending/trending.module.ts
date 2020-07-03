import { Module, HttpModule } from '@nestjs/common';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { PostsModule } from 'src/posts/posts.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, PostsModule, UserModule],
  controllers: [TrendingController],
  providers: [TrendingService]
})
export class TrendingModule { }
