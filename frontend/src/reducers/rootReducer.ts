import { combineReducers } from "redux";
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';
import tagsReducer from './tagsSlice';
import userReducer from "./userSlice";
import isLoggedInReducer from "./isLoggedInSlice";
import groupsReducer from "./groupsSlice";
import attachmentsReducer from "./attachmentsSlice";
import commentsReducer from "./commentsSlice";
import conversationsReducer from "./conversationsSlice";
import videosReducer from "./videosSlice";

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  tags: tagsReducer,
  groups: groupsReducer,
  attachments: attachmentsReducer,
  comments: commentsReducer,
  conversations: conversationsReducer,
  videos: videosReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer