import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserApi, GetInitialDataDto, GetInitialDataLoggedInDto } from "../api";
import { fetchTrendingPosts } from "./postsSlice";
import { CurrentLoggedInUser } from "../store/types";
import _ from "lodash";
import { isGetInitialDataLoggedInDto } from "../util/helperFunctions";
import { postsSlice } from "./postsSlice";


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


export type PostIDPayload = { postID: string };
export type LikePostPayload = { postID: string, increment: boolean };

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
        if (user) {
          user.savedPosts.push(action.payload.postID);
          user.savedPostsSet[action.payload.postID] = true;
        }

        return user;
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
        if (user) {
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
        }
        return user;
      },
      prepare: ({postID, increment}: LikePostPayload) => {
        // update postsSlice
        if (increment) {
          postsSlice.actions.incrementPostLikes({postID});
        } else {
          postsSlice.actions.decrementPostLikes({postID});
        }

        // TODO: make endpoint
        // new UserApi().userControllerToggleLike(payload.postID);
        return { payload: {postID} };
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
          // Update likedPostsSet and savedPostsSet
          userDto.likedPosts?.forEach(postID => state.likedPostsSet[postID] = true);
          userDto.savedPosts?.forEach(postID => state.savedPostsSet[postID] = true);
          return { ...state, ...userDto };
        }

        if (userDto) {
          const freshlyLoggedInUser = { ...userDto, likedPostsSet: {}, savedPostsSet: {} } as CurrentLoggedInUser;
          userDto.likedPosts?.forEach(postID => freshlyLoggedInUser.likedPostsSet[postID] = true);
          userDto.savedPosts?.forEach(postID => freshlyLoggedInUser.savedPostsSet[postID] = true);
          return freshlyLoggedInUser;
        }


      }

      // state may be null, so must explicitly return it
      return state;
    }
  }
})

export default userSlice.reducer;

export const { savePost, toggleLikePost } = userSlice.actions;