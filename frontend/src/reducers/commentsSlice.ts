import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Comment } from "../store/types";
import {CreateCommentServerToClientDto} from "../ws-dto/comments/dto/createComment.ws.dto";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: item => item._id
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState<{isLoading: boolean}>({
    isLoading: false,
  }),//also has ids[] and entities{}
  reducers: {
    createCommentPending: (state) =>{state.isLoading = true},
    createCommentSuccess: (state, action: PayloadAction<CreateCommentServerToClientDto>) => {
      state.isLoading = false;
      commentsAdapter.addOne(state, action.payload.comment);
    }
  },
  extraReducers: {}
})

export default commentsSlice.reducer;
export const {createCommentPending, createCommentSuccess} = commentsSlice.actions;