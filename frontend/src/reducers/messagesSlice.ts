import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Message } from "../store/types";

const messagesAdapter = createEntityAdapter<Message>({
  selectId: item => item._id
});

export const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState({}),//also has ids[] and entities{}
  reducers: {}
})

export default messagesSlice.reducer;