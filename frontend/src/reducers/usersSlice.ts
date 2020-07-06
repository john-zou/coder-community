import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchTrendingPosts } from "./postsSlice";
import { User } from "../store/types";

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
    [fetchTrendingPosts.fulfilled.type]: (state, action) => {
      usersAdapter.addMany(state, action.payload.users) //add users (trending posts' authors) to ids and entities
    }
  }
})

export default usersSlice.reducer;