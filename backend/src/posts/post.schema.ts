import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Tag } from "../tags/tag.schema";
import { User } from "../user/user.schema";
import { Comment } from "../comments/comment.schema";

export class Post extends TimeStamps {//mapped to MongoDb collection 'posts"
  @prop({ ref: 'User' })
  author: Ref<User>;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  content: string;

  @prop({ ref: 'Tag' })
  tags: Ref<Tag>[];

  @prop()
  featuredImg: string;

  @prop({ ref: 'User' })
  likes: Ref<User>[];

  @prop({ ref: 'Comment' })
  comments: Ref<Comment>[];
}

export const PostModel = getModelForClass(Post);