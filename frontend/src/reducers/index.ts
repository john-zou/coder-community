import { combineReducers } from "redux";
import { user } from "./user";
import { posts } from "./posts";
import { groups } from "./groups";
import { tags } from "./tags";
import { videos } from "./videos";
import { currentViewedProfile } from "./currentViewedProfile";
import { trendingPosts } from "./trendingPosts";
import { currentViewedPost } from "./currentViewedPost";

export const rootReducer = combineReducers({
  user,
  currentViewedProfile,
  posts,
  groups,
  tags,
  videos,
  trendingPosts,
  currentViewedPost,
});
