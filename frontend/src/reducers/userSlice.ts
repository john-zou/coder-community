import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserApi, GetInitialDataDto, GetInitialDataLoggedInDto } from "../api";
import { fetchTrendingPosts } from "./postsSlice";
import { CurrentLoggedInUser } from "../store/types";
import _ from "lodash";
import { isGetInitialDataLoggedInDto } from "../util/helperFunctions";


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
const initialState: CurrentLoggedInUser = null;

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
        const { postID } = action.payload;
        // User didn't previously like the post
        if (!user.likedPostsSet[postID]) {
          user.likedPostsSet[postID] = true;
          user.likedPosts.push(action.payload.postID);
        } else {
          // User previously liked the post, now un-likes it
          user.likedPostsSet[postID] = false;
          _.pull(user.likedPosts, action.payload.postID);
        }     
      },
      prepare: (payload: PostIDPayload) => {
        // TODO: make endpoint
        // new UserApi().userControllerToggleLike(payload.postID);
        return { payload };
      }
    }
  },
  extraReducers: {
    // fetchTrendingPosts may return a User
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      if (isGetInitialDataLoggedInDto(action.payload)) {
        const userDto = action.payload.user;

        // If the user already exists, merge the dto with the state (currentUser)
        if (state) {
          // Update likedPostsSet
          userDto.likedPosts?.forEach(post => state.likedPostsSet[post] = true);

          return {...state, ...userDto};
        }

        // Create LoggedInUser
        const freshlyLoggedInUser = {...userDto, likedPostsSet: {}} as CurrentLoggedInUser;
        // Add the liked posts to the likedPostsSet
        userDto.likedPosts?.forEach(postID => freshlyLoggedInUser.likedPostsSet[postID] = true);
        
        return freshlyLoggedInUser;
      }
    }
  }
})

export default userSlice.reducer;

export const { savePost, toggleLikePost } = userSlice.actions;