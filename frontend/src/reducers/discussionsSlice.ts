import { createAsyncThunk, createEntityAdapter, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { DiscussionsApi, GetDiscussionsDto } from "../api";
import { Discussion } from "../store/types";

const discussionsAdapter = createEntityAdapter<Discussion>({
  selectId: item => item._id
})

const api = new DiscussionsApi();

export const fetchDiscussionsByQuestionId = createAsyncThunk(
  'fetchDiscussionsByQuestionId',
  async (qID: string) => {
    const foundDiscussions: GetDiscussionsDto = await api.discussionsControllerGetDiscussionsByQuestionID(qID);
    return foundDiscussions;
  }
)

export const discussionsSlice = createSlice({
  name: "discussions",
  initialState: discussionsAdapter.getInitialState<{ currentDiscussionID: string }>(
    {
      currentDiscussionID: ''
    }
  ),
  reducers: {
    showDiscussion: (state, action: PayloadAction<{ discussionID: string }>) => {
      state.currentDiscussionID = action.payload.discussionID;
    }
  },
  extraReducers: {
    [fetchDiscussionsByQuestionId.fulfilled.type]: (state, action: PayloadAction<GetDiscussionsDto>) => {
      discussionsAdapter.addMany(state, action.payload.discussions);
    }
  }
})

export default discussionsSlice.reducer;
export const { showDiscussion } = discussionsSlice.actions;