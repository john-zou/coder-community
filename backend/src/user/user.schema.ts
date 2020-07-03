import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Group } from '../groups/group.schema';
import { Post } from '../posts/post.schema';
import { Tag } from '../tags/tag.schema';

export class User extends TimeStamps {//mapped to MongoDb collection 'users"
  @prop({ required: true })
  userID: string;

  @prop({ required: true })
  gitHubID: number;

  @prop({ required: true })
  name: string;

  @prop()
  profilePic?: string;

  @prop()
  backgroundImg?: string;

  @prop()
  status?: string;

  @prop({ ref: User })
  followers: Ref<User>[];

  @prop({ ref: User })
  followings: Ref<User>[];

  @prop({ ref: Group })
  groups: Ref<Group>[];

  @prop({ ref: Post })
  savedPosts: Ref<Post>[];

  @prop({ ref: Tag })
  tags: Ref<Tag>[];

  @prop()
  lastLoggedIn: Date;
}