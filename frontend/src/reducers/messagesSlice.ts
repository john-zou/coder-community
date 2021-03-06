import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { CreateMessageBodyDto, CreateMessageSuccessDto, MessageDto, MessagesApi } from "../api";
import { Message } from "../store/types";
import _ from "lodash";

const messagesAdapter = createEntityAdapter<Message>({
  selectId: item => item._id,
});

export const fetchMessagesInConversation = createAsyncThunk(
  'fetchMessagesInConversation',
  async ({ conversationID }: { conversationID: string }) => {
    return await new MessagesApi().messagesControllerGetMessagesInConversation(conversationID);
  }
)

export type PendingMessage = {
  createdAt: number,
  conversationID: string,
  text: string
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState<{ isSending: boolean, isTyping: boolean, isError: any, pendingMessages: PendingMessage[] }>({
    isSending: false,
    isTyping: false,
    isError: null,
    pendingMessages: []
  }),
  reducers: {
    createMessagePending: (state, action: PayloadAction<CreateMessageBodyDto>) => {
      state.isSending = true;
      state.isError = null;
      const newMessage: PendingMessage = {
        conversationID: action.payload.conversationID,
        text: action.payload.text,
        createdAt: action.payload.createdAt,
      }
      state.pendingMessages.push(newMessage);
    },
    createMessageSuccess: (state, action: PayloadAction<CreateMessageSuccessDto>) => {
      state.isSending = false;
      messagesAdapter.addOne(state, action.payload);
      _.remove(state.pendingMessages, (message) => {
        return message.createdAt === action.payload.createdAt;
      });
      state.isError = null;
    },
    createMessageError: (state, action: PayloadAction<Error>) => {
      state.isSending = false;
      state.isError = action.payload;
    },
    receiveNewMessage: (state, action: PayloadAction<CreateMessageSuccessDto>) => {
      messagesAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: {
    [fetchMessagesInConversation.fulfilled.type]: (state, action: PayloadAction<CreateMessageSuccessDto[]>) => {
      messagesAdapter.upsertMany(state, action.payload);
    }
  }
})

export default messagesSlice.reducer;
export const { createMessagePending, createMessageSuccess, createMessageError, receiveNewMessage } = messagesSlice.actions;