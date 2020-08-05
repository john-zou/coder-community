import { combineReducers } from "redux";
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';
import tagsReducer from './tagsSlice';
import userReducer from "./userSlice";
import isLoggedInReducer from "./isLoggedInSlice";
import groupsReducer from "./groupsSlice";
import commentsReducer from "./commentsSlice";
import conversationsReducer from "./conversationsSlice";
import videosReducer from "./videosSlice";
import messagesReducer from "./messagesSlice";
import questionsReducer from "./questionsSlice";
import discussionsReducer from "./discussionsSlice";
import hnPostsReducer from "./hnPostsSlice";

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  hnPosts: hnPostsReducer,
  tags: tagsReducer,
  groups: groupsReducer,
  comments: commentsReducer,
  conversations: conversationsReducer,
  videos: videosReducer,
  messages: messagesReducer,
  questions: questionsReducer,
  discussions: discussionsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer