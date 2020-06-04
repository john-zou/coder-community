import { combineReducers } from "redux";
import { login } from "./login";
import { posts } from "./posts";
import { groups } from "./groups";
import { messages } from "./messages";
import { pics } from "./pics";
import { tags } from "./tags";
import { videos } from "./videos";

export const rootReducer = combineReducers({
  login,
  posts,
  groups,
  messages,
  pics,
  tags,
  videos,
});
