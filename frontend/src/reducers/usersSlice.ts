import { createEntityAdapter, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrendingPosts, fetchPostBySlug } from "./postsSlice";
import { User } from "../store/types";
import {
  GetInitialDataDto,
  GetInitialDataLoggedInDto,
  GetPostDetailsSuccessDto,
  UserApi,
  GetUsersSuccessDto,
  UserDto
} from "../api";
import { leaveGroup, joinGroup } from "./groupsSlice";
import _ from "lodash";

const api = new UserApi();

const usersAdapter = createEntityAdapter<User>({
  selectId: item => item._id,
});

export const fetchUsersByIDs = createAsyncThunk('fetchUsersByIDs', async (IDs: string[]) => {
  return await api.userControllerGetUsersByIDs(IDs.join());
});

export const fetchUserByUsername = createAsyncThunk('fetchUserByUsername', async (username: string) => {
  return await api.userControllerGetUserByUsername(username);
})

//https://redux-toolkit.js.org/api/createSlice
export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState<{usernameToID: Record<string, string>}>(
      {usernameToID: {}}
  ),
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      usersAdapter.addMany(state, action.payload.users) //add users (trending posts' authors) to ids and entities
      // Update username to ObjectID map
      action.payload.users.forEach(user => state.usernameToID[user.userID] = user._id);
    },
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      if (action.payload.author) {
        usersAdapter.upsertOne(state, action.payload.author);

        // Update username to ObjectID map
        state.usernameToID[action.payload.author.userID] = action.payload.author._id;
      }
    },
    [fetchUsersByIDs.fulfilled.type]: (state, action: PayloadAction<GetUsersSuccessDto>) => {
      usersAdapter.upsertMany(state, action.payload.users);
      // Update username to ObjectID map
      action.payload.users.forEach(user => state.usernameToID[user.userID] = user._id);
    },
    [fetchUserByUsername.fulfilled.type]: (state, action: PayloadAction<UserDto>) => {
      usersAdapter.upsertOne(state, action.payload);
      // Update username to ObjectID map
      state.usernameToID[action.payload.userID] = action.payload._id;
    },
    [leaveGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      if (state.entities[action.payload.userID]) {
        _.pull(state.entities[action.payload.userID].groups, action.payload.groupID);
      }
    },
    [joinGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      if (state.entities[action.payload.userID]) {
        state.entities[action.payload.userID].groups.push(action.payload.groupID)
      }
    }
  }
})

export default usersSlice.reducer;