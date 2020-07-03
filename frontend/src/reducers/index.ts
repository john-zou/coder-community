import { combineReducers } from "redux";
import { user } from "./user";
import { posts } from "./posts";
import { groups } from "./groups";
import { tags } from "./tags";
import { videos } from "./videos";
import { currentViewedProfile } from "./currentViewedProfile";
import { trendingPosts } from "./trendingPosts";
import { currentViewedPost } from "./currentViewedPost";
import { savedPosts } from "./savedPosts";
import { isLoggedIn } from "./isLoggedIn";
import { users } from "./users";


export const rootReducer = combineReducers({
  user,
  users,
  currentViewedProfile,
  posts,
  groups,
  tags,
  videos,
  trendingPosts,
  currentViewedPost,
  savedPosts,
  isLoggedIn
});
