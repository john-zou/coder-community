import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VideosModule } from './videos/videos.module';
import { GroupsModule } from './groups/groups.module';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { TrendingModule } from './trending/trending.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PublicUserContentDir, PublicUserContentServeRoot } from './storage/storage.constants';
import { DevModule } from './dev/dev.module';
@Module({
  imports: [
    // Modules corresponding directly to Mongoose Models / MongoDB collections
    UserModule,
    TagsModule,
    PostsModule,
    CommentsModule,
    VideosModule,
    GroupsModule,
    StorageModule,
    UploadModule,
    MessagesModule,
    ConversationsModule,
    AttachmentsModule,
    
    // Special modules
    AuthModule,
    StorageModule,
    UploadModule,
    TrendingModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", PublicUserContentDir),
      serveRoot: PublicUserContentServeRoot,
    }),

    // Module for dev convenience -- remove when deploying
    DevModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
