import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Comment } from "../comments/comment.schema";

import { Conversation } from '../conversations/conversation.schema';
import { Group } from '../groups/group.schema';
import { Post } from '../posts/post.schema';
import { Tag } from '../tags/tag.schema';

export class Video extends TimeStamps {
  @prop({ ref: 'User' })
  author: Ref<User>;

  @prop()
  name: string;

  @prop()
  description: string;

  // @prop()
  // content: 

  @prop({ ref: 'User' })
  likes: Ref<User>[];


  @prop({ ref: 'Comment' })
  comments: Ref<Comment>[];
}

export type VideoModel = ReturnModelType<typeof Video>;