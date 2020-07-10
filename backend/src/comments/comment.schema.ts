import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Post } from '../posts/post.schema';
import { User } from '../user/user.schema';
import { Video } from '../video/video.schema';

export enum CommentRoot {
  POST = 'post',
  VIDEO = 'video'
}

export class Comment extends TimeStamps {

  @prop({ ref: User })
  author: Ref<User>;

  @prop()
  content: string;

  @prop({ ref: Comment })
  replies: Ref<Comment>[];

  @prop({ enum: CommentRoot })
  commentRoot: CommentRoot;

  @prop({ ref: User })
  likes: Ref<User>[];

  @prop({ ref: Post })
  parentPost?: Ref<Post>;

  @prop({ ref: Comment })
  parentComment?: Ref<Comment>;

  @prop({ ref: Video })
  parentVideo?: Ref<Video>;
}
