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
import { SearchModule } from './search/search.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    // Modules corresponding directly to Mongoose Models / MongoDB collections
    UserModule,
    TagsModule,
    PostsModule,
    CommentsModule,
    DiscussionsModule,
    VideoModule,
    GroupsModule,
    StorageModule,
    UploadModule,
    MessagesModule,
    ConversationsModule,
    AttachmentsModule,
    VideoModule,
    QuestionsModule,

    // Special modules
    AuthModule,
    StorageModule,
    UploadModule,
    TrendingModule,
    SearchModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', PublicUserContentDir),
      serveRoot: PublicUserContentServeRoot,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "build"), // for react
      serveRoot: "/",
    }),

    // DevModule, // Commented out for production
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
