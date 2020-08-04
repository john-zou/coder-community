import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { UserModule } from '../user/user.module';
import { DevController } from './dev.controller';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [UserModule, AuthModule, PostsModule, TagsModule],
  controllers: [DevController],
})
export class DevModule {}
