import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Comment } from '../comments/comment.schema';
import { Group } from '../groups/group.schema';
import { Tag } from '../tags/tag.schema';
import { User } from '../user/user.schema';

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

  @prop()
  likes: number;

  @prop({ ref: 'Comment' })
  comments: Ref<Comment>[];

  @prop()
  views: number;

  @prop({ ref: 'Group' })
  group: Ref<Group>;
}
