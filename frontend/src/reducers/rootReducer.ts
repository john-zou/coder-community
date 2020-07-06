import { combineReducers } from "redux";
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';
import tagsReducer from './tagsSlice';
import userReducer from "./userSlice";
import isLoggedInReducer from "./isLoggedInSlice";

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  tags: tagsReducer,
  //TODO
  // attachments: attachmentsReducer,
  // comments: commentsReducer,
  // conversations: conversationsReducer,
  // groups: groupsReducer,
  // videos: videosReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer