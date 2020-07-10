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

const api = new UserApi();

const usersAdapter = createEntityAdapter<User>({
  selectId: item => item._id
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
    [fetchUserByUsername.fulfilled.type]: (state, action: PayloadAction<UserDto>) => {
      usersAdapter.upsertOne(state, action.payload);
    }
  }
})

export default usersSlice.reducer;