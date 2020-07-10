import { createEntityAdapter, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrendingPosts, fetchPostBySlug } from "./postsSlice";
import { User } from "../store/types";
import { GetInitialDataDto, GetInitialDataLoggedInDto, GetPostDetailsSuccessDto, UserApi, GetUsersSuccessDto } from "../api";
import { leaveGroup, joinGroup } from "./groupsSlice";
import _ from "lodash";

const usersAdapter = createEntityAdapter<User>({
  selectId: item => item._id
})
export const fetchUsersByIDs = createAsyncThunk('fetchUsersByIDs', async (IDs: string[]) => {
  const api = new UserApi();
  return await api.userControllerGetUsersByIDs(IDs.join());
})

//https://redux-toolkit.js.org/api/createSlice
export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      usersAdapter.addMany(state, action.payload.users) //add users (trending posts' authors) to ids and entities
    },
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      if (action.payload.author) {
        usersAdapter.upsertOne(state, action.payload.author);
      }
    },
    [fetchUsersByIDs.fulfilled.type]: (state, action: PayloadAction<GetUsersSuccessDto>) => {
      usersAdapter.upsertMany(state, action.payload.users);
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