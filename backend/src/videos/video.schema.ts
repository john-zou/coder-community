import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Comment } from "../comments/comment.schema";

export class Video extends TimeStamps {
  @prop({ ref: User })
  author: Ref<User>;

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  content: 
  
  @prop()
  fileSize: number;

  @prop({ ref: User })
  likedByUsers: Ref<User>[];

  @prop({ ref: Comment })
  comments: Ref<Comment>[];
}