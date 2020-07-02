import { Module, HttpModule } from '@nestjs/common';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { User } from '../user/user.schema';
import { Post } from '../posts/post.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [HttpModule, TypegooseModule.forFeature([User, Post])],
  controllers: [TrendingController],
  providers: [TrendingService, PostsService]
})
export class TrendingModule { }
