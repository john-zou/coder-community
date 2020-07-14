import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachmentsModule } from './attachments/attachments.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ConversationsModule } from './conversations/conversations.module';
import { DevModule } from './dev/dev.module';
import { GroupsModule } from './groups/groups.module';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { PublicUserContentDir, PublicUserContentServeRoot } from './storage/storage.constants';
import { StorageModule } from './storage/storage.module';
import { TagsModule } from './tags/tags.module';
import { TrendingModule } from './trending/trending.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { EntityQueryModule } from './entity-query/entity-query.module';
import { EntityQueryGateway } from './entity-query/entity-query.gateway';

@Module({
  imports: [
    // Modules corresponding directly to Mongoose Models / MongoDB collections
    UserModule,
    TagsModule,
    PostsModule,
    CommentsModule,
    VideoModule,
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
    DevModule,
    DevModule,

     VideoModule,

     EntityQueryModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
