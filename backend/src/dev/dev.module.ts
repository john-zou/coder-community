import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { UserModule } from '../user/user.module';
import { DevController } from './dev.controller';

@Module({
  imports: [UserModule, AuthModule, PostsModule],
  controllers: [DevController],
})
export class DevModule {}
