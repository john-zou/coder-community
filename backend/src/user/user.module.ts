import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PostsModule],//forFeature creates model User
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
