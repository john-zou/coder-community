import { combineReducers } from 'redux';
import { browsingGroups } from "./browsingGroups";
import { cache } from './cache';
import { isLoggedIn } from './isLoggedIn';
import { savedPosts } from "./savedPosts";
import { selectedTab } from "./selectedTab";
import { slugs } from './slugs';
import { trendingPosts } from './trendingPosts';
import { trendingVideos } from "./trendingVideos";
import { user } from './user';
import { userIDs } from './userIDs';
import { userOwnPosts } from "./userOwnPosts";



export const rootReducer = combineReducers({
  isLoggedIn,
  selectedTab,

  cache,

  slugs,
  userIDs,

  user,
  trendingPosts,
  browsingGroups,
  userOwnPosts,
  trendingVideos,
  savedPosts,
});
