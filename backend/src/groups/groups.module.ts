import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from '../messages/message.schema';
import { User } from '../user/user.schema';
import { Post } from '../posts/post.schema';
import { Video } from '../videos/video.schema';

@Module({
  imports: [TypegooseModule.forFeature([Message, User, Post, Video])],
})
export class GroupsModule { }
