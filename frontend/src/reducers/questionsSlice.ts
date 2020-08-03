import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetQuestionsSuccessDto, QuestionsApi } from "../api";
import { Question } from "../store/types";
import { getRandomInt } from "../util/helperFunctions";

const questionsAdapter = createEntityAdapter<Question>({
  selectId: item => item._id
})

const api = new QuestionsApi();

export const fetchQuestions = createAsyncThunk(
  'fetchQuestions',
  async (_, { getState }) => {
    const questions: GetQuestionsSuccessDto = await api.questionsControllerGetQuestions();
    return questions;
  }
)

export const questionSlide = createSlice({
  name: "questions",
  initialState: questionsAdapter.getInitialState<{ currentQuestionID: string }>(
    {
      currentQuestionID: ''
    }
  ),
  reducers: {

  },
  extraReducers: {
    [fetchQuestions.fulfilled.type]: (state, action: PayloadAction<GetQuestionsSuccessDto>) => {
      questionsAdapter.addMany(state, action.payload.questions);
      const len = state.ids.length;
      state.currentQuestionID = state.ids[getRandomInt(len)].toString();
    }
  }

})

export default questionSlide.reducer;
