import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Post } from '../posts/post.schema';
import { User } from '../user/user.schema';
import { Video } from '../videos/video.schema';

export class Group extends TimeStamps {
  @prop()
  name: string;

  @prop()
  profilePic?: string;

  @prop()
  profileBanner?: string;

  @prop({ ref: 'User' })
  users: Ref<User>[];

  @prop({ ref: 'Post' })
  posts: Ref<Post>[];

  @prop({ ref: 'Video' })
  videos: Ref<Video>[];
}
