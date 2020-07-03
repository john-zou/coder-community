import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { Tag } from "../tags/tag.schema";
import { User } from "../user/user.schema";
import { Comment } from "../comments/comment.schema";
import { Group } from "../groups/group.schema";

export class Post extends TimeStamps {//mapped to MongoDb collection 'posts"
  @prop({ ref: 'User' })
  author: Ref<User>;

  @prop()
  title: string;

  @prop()
  slug: string;

  @prop()
  previewContent: string;

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

  @prop()
  views: number;

  @prop({ ref: 'Group' })
  group: Ref<Group>;
}

export type PostModel = ReturnModelType<typeof Post>;