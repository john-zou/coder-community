import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../store/types";
import { CreateCommentServerToClientDto } from "../ws-dto/comments/dto/createComment.ws.dto";
import { GetCommentsServerToClientDto } from "../ws-dto/comments/dto/getCommentsByPostID.ws.dto";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: item => item._id
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState<{ isLoading: boolean }>({
    isLoading: false,
  }),//also has ids[] and entities{}
  reducers: {
    getCommentsByPostIDSuccess: (state, action: PayloadAction<GetCommentsServerToClientDto>) => {
      commentsAdapter.upsertMany(state, action.payload.comments);
    },
    createCommentPending: (state) => { state.isLoading = true },
    createCommentSuccess: (state, action: PayloadAction<CreateCommentServerToClientDto>) => {
      state.isLoading = false;
      commentsAdapter.addOne(state, action.payload.comment);
      // if comment is a reply to the comment, then update the parent comment
      const parentComment = action.payload.comment.parentComment;
      if (parentComment) {
        state.entities[parentComment].replies?.push(action.payload.comment._id);
      }
    }
  },
  extraReducers: {}
})

export default commentsSlice.reducer;
export const { createCommentPending, createCommentSuccess, getCommentsByPostIDSuccess } = commentsSlice.actions;