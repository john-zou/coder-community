import { Module, HttpModule } from '@nestjs/common';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { User } from '../user/user.schema';
import { Post } from '../posts/post.schema';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [HttpModule, TypegooseModule.forFeature([User, Post])],
  controllers: [TrendingController],
  providers: [TrendingService]
})
export class TrendingModule { }
