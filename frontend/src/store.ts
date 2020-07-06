import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsSlice';
import usersReducer from './reducers/usersSlice';
import tagsReducer from './reducers/tagsSlice';
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export default store;

