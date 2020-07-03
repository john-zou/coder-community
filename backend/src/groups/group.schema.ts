import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Post } from "../posts/post.schema";
import { Video } from "../videos/video.schema";

export class Group extends TimeStamps {
  @prop()
  name: string;

  @prop()
  profilePic?: string;

  @prop()
  backgroundImg?: string;

  @prop({ ref: User })
  users: Ref<User>[];

  @prop({ ref: Post })
  posts: Ref<Post>[];

  @prop({ ref: Video })
  videos: Ref<Video>[];
}

export type GroupModel = ReturnModelType<typeof Group>;