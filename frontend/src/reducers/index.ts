import { combineReducers } from 'redux';

import { attachments } from './attachments';
import { comments } from './comments';
import { conversations } from './conversations';
import { groups } from './groups';
import { isLoggedIn } from './isLoggedIn';
import { messages } from './messages';
import { posts } from './posts';
import { slugs } from './slugs';
import { tags } from './tags';
import { trendingPosts } from './trendingPosts';
import { user } from './user';
import { users } from './users';
import { videos } from './videos';


export const rootReducer = combineReducers({
  isLoggedIn,

  attachments,
  comments,
  conversations,
  groups,
  messages,
  posts,
  tags,
  users,
  videos,

  slugs,

  user,
  trendingPosts,
});
