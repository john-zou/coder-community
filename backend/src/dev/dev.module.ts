import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [UserModule, AuthModule, PostsModule],
  controllers: [DevController],
})
export class DevModule {}
