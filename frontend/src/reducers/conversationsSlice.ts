import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreateConversationBodyDto} from "../api";
import {Conversation} from "../store/types";
import {ConversationDto} from "../ws-dto/messages/messenger.ws.dto";
import {fetchMessagesInConversation} from "./messagesSlice";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: item => item._id
});

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: conversationsAdapter.getInitialState<{
    currentConversationID: string,
    isGroupConversation: boolean,
    isDirectConversation: boolean
    isLoading: boolean,
  }>({
    currentConversationID: '', //the conversation shown in CHat Window
    isGroupConversation: false,
    isDirectConversation: true,
    isLoading: false,
  }),//also has ids[] and entities{}
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationDto>) => {
      conversationsAdapter.addOne(state, action.payload);
    },
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
      state.isLoading = true;
      state.currentConversationID = id;
    },
    createConversationPending: (state) => {
      state.isLoading = true;
    },
    createConversationSuccess: (state, action: PayloadAction<ConversationDto>) => {
      conversationsAdapter.addOne(state, action.payload);
      state.isLoading = true;
      state.currentConversationID = action.payload._id;
    }
  },
  extraReducers: {
    'getConversationsAndUsers': (state, action: PayloadAction<any>) => {
      conversationsAdapter.upsertMany(state, action.payload.conversations);
    },
    [fetchMessagesInConversation.fulfilled.type]: (state) => {
      state.isLoading = false;
    }
  }
})

export default conversationSlice.reducer;
export const {addConversation, selectConversation, createConversationPending, createConversationSuccess} = conversationSlice.actions;