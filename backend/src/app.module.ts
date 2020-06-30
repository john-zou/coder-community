import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MONGODB_URI } from './auth/constants';
import { TypegooseModule } from 'nestjs-typegoose';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VideosModule } from './videos/videos.module';
import { GroupsModule } from './groups/groups.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
@Module({
  imports: [AuthModule, UserModule, TypegooseModule.forRoot(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }), TagsModule, PostsModule, CommentsModule, VideosModule, GroupsModule, MessagesModule, ConversationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
