import { Module, HttpModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.schema';
import { User } from '../user/user.schema';

@Module({
  imports: [HttpModule, TypegooseModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule { }
