import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { Post } from "../posts/post.schema";

export class Tag extends TimeStamps {
  @prop()
  name: string;

  @prop({ ref: Post })
  posts: Ref<Post>[];
}

export type TagModel = ReturnModelType<typeof Tag>;