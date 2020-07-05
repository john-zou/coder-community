import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Post } from '../posts/post.schema';
import { User } from '../user/user.schema';
import { Video } from '../videos/video.schema';

/**
 * The Group Schema
 * 
 * If making any changes, make sure to double check group.service.ts!
 */
export class Group extends TimeStamps {
  @prop()
  name: string;

  @prop()
  description?: string;

  @prop()
  profilePic?: string;

  @prop()
  profileBanner?: string;

  @prop({ ref: 'User' })
  admins: Ref<User>[]

  @prop()
  private: boolean;

  @prop({ ref: 'User' })
  users: Ref<User>[];

  @prop({ ref: 'Post' })
  posts: Ref<Post>[];

  @prop({ ref: 'Video' })
  videos: Ref<Video>[];
}
