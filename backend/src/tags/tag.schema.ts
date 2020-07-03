import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref } from "@typegoose/typegoose";
import { Post } from "../posts/post.schema";

export class Tag extends TimeStamps {
  @prop()
  name: string;

  @prop({ ref: 'Post' })
  posts: Ref<Post>[];
}
