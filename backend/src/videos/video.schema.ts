import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Comment } from "../comments/comment.schema";

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

export const VideoModel = getModelForClass(Video);