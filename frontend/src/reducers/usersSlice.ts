import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTrendingPosts, fetchPostBySlug } from "./postsSlice";
import { User } from "../store/types";
import { GetInitialDataDto, GetInitialDataLoggedInDto, GetPostDetailsSuccessDto } from "../api";

const usersAdapter = createEntityAdapter<User>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createSlice
export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action/*: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>*/) => {
      usersAdapter.addMany(state, action.payload.users) //add users (trending posts' authors) to ids and entities
    },
    [fetchPostBySlug.fulfilled.type]: (state, action/*: PayloadAction<GetPostDetailsSuccessDto>*/) => {
      if (action.payload.author) {
        usersAdapter.upsertOne(state, action.payload.author);
      }
    }
  }
})

export default usersSlice.reducer;