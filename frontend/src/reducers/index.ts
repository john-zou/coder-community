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
import { userIDs } from './userIDs';
import { userOwnPosts } from "./userOwnPosts";
import { trendingVideos } from "./trendingVideos";
import { savedPosts } from "./savedPosts";
import { selectedTab } from "./selectedTab";
import { browsingGroups } from "./browsingGroups";


export const rootReducer = combineReducers({
  isLoggedIn,
  selectedTab,

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
  userIDs,

  user,
  trendingPosts,
  browsingGroups,
  userOwnPosts,
  trendingVideos,
  savedPosts,
});
