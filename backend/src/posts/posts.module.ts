import { Module, HttpModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.schema';

@Module({
  imports: [HttpModule, TypegooseModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
