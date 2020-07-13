import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../store/types";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: item => item._id
});

export const conversationSlice = createSlice({
  name: "posts",
  initialState: conversationsAdapter.getInitialState<{ currentConversationID: string, isGroupConversation: boolean, isDirectConversation: boolean }>({
    currentConversationID: '',
    isGroupConversation: false,
    isDirectConversation: true,
  }),//also has ids[] and entities{}
  reducers: {
    selectConversation: (state, action: PayloadAction<{ conversationID: string }>) => {
      const id = action.payload.conversationID;
      const conversation = state.entities[id];
      if (conversation.users.length > 2) {
        state.isDirectConversation = false;
        state.isGroupConversation = true;
      } else {
        state.isDirectConversation = true;
        state.isGroupConversation = false;
      }
      state.currentConversationID = id;
    }
  }
})

export default conversationSlice.reducer;
export const { selectConversation } = conversationSlice.actions;