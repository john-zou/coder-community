import { combineReducers } from "redux";
import { user } from "./user";
import { posts } from "./posts";
import { groups } from "./groups";
import { tags } from "./tags";
import { videos } from "./videos";
import { trendingPosts } from "./trendingPosts";
import { currentViewedPost } from "./currentViewedPost";
import { savedPosts } from "./savedPosts";

export const rootReducer = combineReducers({
  user,
  posts,
  groups,
  tags,
  videos,
  trendingPosts,
  currentViewedPost,
  savedPosts,
});
