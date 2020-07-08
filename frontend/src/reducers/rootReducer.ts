import { combineReducers } from "redux";
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';
import tagsReducer from './tagsSlice';
import userReducer from "./userSlice";
import isLoggedInReducer from "./isLoggedInSlice";
import groupsReducer from "./groupsSlice";

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  tags: tagsReducer,
  groups: groupsReducer,
  //TODO
  // attachments: attachmentsReducer,
  // comments: commentsReducer,
  // conversations: conversationsReducer,
  // videos: videosReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer