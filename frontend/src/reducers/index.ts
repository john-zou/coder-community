import { combineReducers } from "redux";
import { user } from "./user";
import { posts } from "./posts";
import { groups } from "./groups";
import { tags } from "./tags";
import { videos } from "./videos";

export const rootReducer = combineReducers({
  user,
  posts,
  groups,
  tags,
  videos,
});
