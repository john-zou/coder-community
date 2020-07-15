import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateConversationBodyDto } from "../api";
import { Conversation } from "../store/types";
import { fetchMessagesInConversation } from "./messagesSlice";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: item => item._id
});

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: conversationsAdapter.getInitialState<{ currentConversationID: string, isGroupConversation: boolean, isDirectConversation: boolean }>({
    currentConversationID: '', //the conversation shown in CHat Window
    isGroupConversation: false,
    isDirectConversation: true
  }),//also has ids[] and entities{}
  reducers: {
    selectConversation: (state, action: PayloadAction<{ conversationID: string }>) => {
      const id = action.payload.conversationID;
      const conversation = state.entities[id];
      console.log(conversation);
      if (conversation.users.length > 2) {
        state.isDirectConversation = false;
        state.isGroupConversation = true;
      } else {
        state.isDirectConversation = true;
        state.isGroupConversation = false;
      }
      // fetchMessagesInConversation({ conversationID: id });
      state.currentConversationID = id;
    },
    createConversationSuccess: (state, action: PayloadAction<CreateConversationBodyDto>) => {
      // TODO
    },
    newConversationFromElsewhere: (state, action) => {
      // TODO
    }
  },
  extraReducers: {
    'getConversationsAndUsers': (state, action: PayloadAction<any>) => {
      conversationsAdapter.upsertMany(state, action.payload.conversations);
    }
  }
})

export default conversationSlice.reducer;
export const { selectConversation } = conversationSlice.actions;