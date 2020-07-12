import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../store/types";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: item => item._id
});

export const conversationSlice = createSlice({
  name: "posts",
  initialState: conversationsAdapter.getInitialState<{ currentConversationID: string, isGroupConversation: boolean }>({
    currentConversationID: '',
    isGroupConversation: false,
  }),//also has ids[] and entities{}
  reducers: {

  }
})

export default conversationSlice.reducer;