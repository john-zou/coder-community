import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Attachment } from "../store/types";

const attachmentsAdapter = createEntityAdapter<Attachment>({
  selectId: item => item._id
});

export const attachmentsSlice = createSlice({
  name: "attachments",
  initialState: attachmentsAdapter.getInitialState({}),//also has ids[] and entities{}
  reducers: {}
})

export default attachmentsSlice.reducer;