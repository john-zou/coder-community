import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../store/types";

const conversationsAdapter = createEntityAdapter<Conversation>({
  selectId: item => item._id
});


export const fetchConversations = createAsyncThunk(
  'fetchConversations',
  async () => {
    const conversations = null;
    return conversations;
  }
)

export const conversationSlice = createSlice({
  name: "posts",
  initialState: conversationsAdapter.getInitialState<{ currentConversationID: string, isGroupConversation: boolean, isDirectConversation: boolean }>({
    currentConversationID: '5f0bc1e08743a61be4fd8e2e',
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
  },
  extraReducers: {
    'getConversationsAndUsers': (state, action: PayloadAction<any>) => {
      conversationsAdapter.upsertMany(state, action.payload.conversations);
    }
  }
})

export default conversationSlice.reducer;
export const { selectConversation } = conversationSlice.actions;