import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Conversation } from '../conversations/conversation.schema';
import { Group } from '../groups/group.schema';
import { Post } from '../posts/post.schema';
import { Tag } from '../tags/tag.schema';
import { Comment } from "../comments/comment.schema";

export class User extends TimeStamps {//mapped to MongoDb collection 'users"
  @prop({ required: true, unique: true })
  userID: string;

  @prop({ required: true })
  gitHubID: number;

  @prop({ required: true })
  name: string;

  @prop()
  profilePic?: string;

  @prop()
  profileBanner?: string;

  @prop()
  status?: string;

  @prop({ ref: 'User' })
  followers: Ref<User>[];

  @prop({ ref: 'User' })
  following: Ref<User>[];

  @prop({ ref: 'Group' })
  groups: Ref<Group>[];

  @prop({ ref: 'Post' })
  posts: Ref<Post>[];

  @prop({ ref: 'Comment' })
  comments: Ref<Comment>[];

  @prop({ ref: 'Post' })
  savedPosts: Ref<Post>[];

  @prop({ ref: 'Post' })
  likedPosts: Ref<Post>[];

  @prop({ ref: 'Comment' })
  likedComments: Ref<Comment>[];

  @prop({ ref: 'Tag' })
  tags: Ref<Tag>[];

  @prop({ ref: 'Conversation' })
  conversations: Ref<Conversation>[];

  @prop()
  lastLoggedIn: Date;
}

