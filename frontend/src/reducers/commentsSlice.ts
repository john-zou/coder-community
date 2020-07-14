import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../store/types";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: item => item._id
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({}),//also has ids[] and entities{}
  reducers: {}
})

export default commentsSlice.reducer;