import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreateConversationBodyDto, CreateMessageSuccessDto} from "../api";
import {Conversation} from "../store/types";
import {ConversationDto} from "../ws-dto/messages/messenger.ws.dto";
import {fetchMessagesInConversation, createMessageSuccess, receiveNewMessage} from "./messagesSlice";

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
    setNewConversation: (state) => {
      state.currentConversationID = "";
    },
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
      state.isLoading = true;
      state.currentConversationID = id;
    },
    createDirectConversationPending: (state) => {
      state.isLoading = true;
      state.isDirectConversation = true;
      state.isGroupConversation = false;
    },
    createGroupConversationPending: (state) => {
      state.isLoading = true;
      state.isGroupConversation = true;
      state.isDirectConversation = false;
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
    },
    [createMessageSuccess.type]: (state, action: PayloadAction<CreateMessageSuccessDto>) => {
      state.entities[state.currentConversationID].messages.push(action.payload._id);
    },
    [receiveNewMessage.type]: (state, action: PayloadAction<CreateMessageSuccessDto>) => {
      state.entities[action.payload.conversationID].messages.push(action.payload._id);
    }
  }

})
export default conversationSlice.reducer;
export const {
  addConversation,
  selectConversation,
  createDirectConversationPending,
  createGroupConversationPending,
  createConversationSuccess,
  setNewConversation
} = conversationSlice.actions;