import { combineReducers } from "redux";
import { user } from "./user";
import { posts } from "./posts";
import { groups } from "./groups";
import { tags } from "./tags";
import { videos } from "./videos";
import { currentViewedProfile } from "./currentViewedProfile";

export const rootReducer = combineReducers({
  user,
  currentViewedProfile,
  posts,
  groups,
  tags,
  videos,
});
