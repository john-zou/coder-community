import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchTrendingPosts } from "./postsSlice";
import { Tag } from "../store";

const tagsAdapter = createEntityAdapter<Tag>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createSlice
export const tagsSlice = createSlice({
  name: "users",
  initialState: tagsAdapter.getInitialState({ //extends EntityState
  }),//has ids[] and entities{} by default
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action) => {
      tagsAdapter.addMany(state, action.payload.tags) //add tags to ids and entities
    }
  }
})

export default tagsSlice.reducer;