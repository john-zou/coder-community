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
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PublicUserContentDir, PublicUserContentServeRoot } from './storage/storage.constants';
@Module({
  imports: [AuthModule,UserModule,
    TypegooseModule.forRoot(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", PublicUserContentDir),
    serveRoot: PublicUserContentServeRoot,
  }),
  TagsModule, PostsModule, CommentsModule, VideosModule, GroupsModule, StorageModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
