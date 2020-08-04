import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsApi } from "../api";
import { HNPost } from "../store/types";

const hnPostsAdapter = createEntityAdapter<HNPost>();

export const fetchHackerNewsPosts = createAsyncThunk('fetchHackerNewsPosts', async () => {
  const res = await new PostsApi().postsControllerGetHackerNewsPosts()
  console.log(res)
  return res
})

export const hnPostsSlice = createSlice({
  name: 'hnposts',
  initialState: hnPostsAdapter.getInitialState<{
    hnPostsFetchCount: number,
    hasMoreHnPosts: boolean,
  }>({
    hnPostsFetchCount: 0,
    hasMoreHnPosts: true
  }),
  reducers: {},
  extraReducers: {
    [fetchHackerNewsPosts.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log("before upsert");
      console.log(action.payload);
      try {
        hnPostsAdapter.upsertMany(state, action.payload)
      } catch (err) {
        console.log(err)
      }
      console.log("after upsert");

    }
  }
})

export default hnPostsSlice.reducer;