import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../api";
import { fetchTrendingPosts } from "./postsSlice";
import { User } from "../store/types";
import _ from "lodash";


export const getLoggedInUser = createAsyncThunk(
  '/user/getLoggedInUserStatus',
  async () => {
    const api = new UserApi();
    return await api.userControllerGetUser();
  }
)

export const getUserForViewProfile = (userName) => createAsyncThunk(
  '/user/getUserForViewProfileStatus',
  async () => {
    //TODO
  }
)


type PostIDPayload = { postID: string };

//https://redux-toolkit.js.org/api/createSlice
// The state is just User, and initialized to null
const initialState: User = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    savePost: {
      reducer: (user, action: PayloadAction<PostIDPayload>) => {
        // optimistic update
        if (!user.savedPosts) {
          console.log("user.savedPosts array didn't exist. This is unexpected. Creating new array.");
          user.savedPosts = [action.payload.postID];
        } else {
          user.savedPosts.push(action.payload.postID);
        }
      },
      // to perform side effect. Does not affect payload
      prepare: (payload: PostIDPayload) => {
        // TODO: make endpoint
        // new UserApi().userControllerSavePost(payload.postId);
        return { payload };
      },
    },
    toggleLikePost: {
      reducer: (user, action: PayloadAction<PostIDPayload>) => {
        // optimistic update
        if (!user.likedPosts) {
          // Something might have gone wrong and likedPosts doesn't exist
          console.log("user.likedPosts array didn't exist. This is unexpected. Creating new array.");
          user.likedPosts = [action.payload.postID];
        } else {
          if (user.likedPosts.includes(action.payload.postID)) {
            _.pull(user.likedPosts, action.payload.postID);
          } else {
            user.likedPosts.push(action.payload.postID);
          }
        }
      },
      // to perform side effect. Does not affect payload
      prepare: (payload: PostIDPayload) => {
        // TODO: make endpoint
        // new UserApi().userControllerToggleLike(payload.postID);
        return { payload };
      }
    }
  },
  extraReducers: {
    // fetchTrendingPosts may return a User
    [fetchTrendingPosts.fulfilled.type]: (state, action) => {
      if (action.payload.user) {
        const user = action.payload.user;
        if (state) {
          // update the user
          return {...state, ...user};
        } else {
          // use payload as next state
          return user;
        }
      }
    }
  }
})

export default userSlice.reducer;

export const { savePost, toggleLikePost } = userSlice.actions;