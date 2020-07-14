import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserApi, GetInitialDataDto, GetInitialDataLoggedInDto, PostsApi, AuthApi, UpdateProfileReqDto, CreateGroupSuccessDto } from "../api";
import { fetchTrendingPosts } from "./postsSlice";
import { CurrentLoggedInUser } from "../store/types";
import _ from "lodash";
import { isGetInitialDataLoggedInDto } from "../util/helperFunctions";
import { JwtLocalStorageKey } from "../constants";
import { isLoggedInSlice } from "./isLoggedInSlice";
import { createGroup, leaveGroup, joinGroup } from "./groupsSlice";

const api = new UserApi();
export const getLoggedInUser = createAsyncThunk(
  'getLoggedInUser',
  async () => {
    return await api.userControllerGetUser();
  }
)

export const login = createAsyncThunk(
  'loginStatus',
  async ({ code, state }: { code: string, state: string }) => {
    await new AuthApi().authControllerLoginGitHub({ code, state })
  }
);

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (update: UpdateProfileReqDto) => {
    await api.userControllerEditProfile(update);
    return { update };
  }
)

export const getUserForViewProfile = (userName) => createAsyncThunk(
  'getUserForViewProfile',
  async () => {
    //TODO
  }
)

export const addFollowing = (id: string) => createAsyncThunk(
  'addFollowing', async () => {
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
    loginSuccess: {
      reducer: (user, action: PayloadAction<null>) => {
        return null;
      },
      prepare: ({ jwt }: { jwt: string }) => {
        localStorage.setItem(JwtLocalStorageKey, jwt);
        return { payload: null };
      },
    },
    logOut: {
      reducer: (user, action: PayloadAction<null>) => {
        return null;
      },
      prepare: () => {
        localStorage.removeItem(JwtLocalStorageKey);
        return { payload: null };
      }
    },
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
        // Send request to back end silently
        new UserApi().userControllerSavePost(payload.postID)
          .then(_ => console.log("Optimistic update (SAVE POST) finished in back end"))
          .catch(err => console.log("Optimistic update (SAVE POST) rejected! ", err));
        return { payload };
      },
    },
    toggleLikePost: {
      reducer: (user, action: PayloadAction<PostIDPayload & { increment: boolean }>) => {
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
      prepare: ({ postID, increment }: LikePostPayload) => {
        // Send request to back end silently
        if (increment) {
          new PostsApi().postsControllerLikePost(postID)
            .then(_ => console.log("Optimistic update (LIKE POST) finished in back end for Post ID"))
            .catch(err => console.log("Optimistic update (LIKE POST) rejected! ", err));
        } else {
          new PostsApi().postsControllerUnlikePost(postID)
            .then(_ => console.log("Optimistic update (UNLIKE POST) finished in back end for Post ID"))
            .catch(err => console.log("Optimistic update (UNLIKE POST) rejected! ", err));
        }
        return { payload: { postID, increment } };
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
    },
    //add group to user's list of groups
    [createGroup.fulfilled.type]: (state, action: PayloadAction<CreateGroupSuccessDto>) => {
      state.groups.push(action.payload._id);
    },

    [leaveGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      _.pull(state.groups, action.payload.groupID);
    },
    [joinGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      state.groups.push(action.payload.groupID);
    },

    // Logging out should clear the state
    [isLoggedInSlice.actions.logOut.type]: () => {
      return null;
    },

    [updateProfile.fulfilled.type]: (state, action: PayloadAction<UpdateProfileReqDto>) => {
      if (!state) {
        return null;
      }
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      if (action.payload.status) {
        state.status = action.payload.status;
      }
      if (Array.isArray(action.payload.tags)) {
        state.tags = action.payload.tags;
      }
    }
  }
})

export default userSlice.reducer;

export const { savePost, toggleLikePost, loginSuccess, logOut } = userSlice.actions;