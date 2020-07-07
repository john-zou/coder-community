import { createEntityAdapter, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../store/types";
import { GroupsApi, GetGroupsSuccessDto } from "../api";

const groupsAdapter = createEntityAdapter<Group>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchGroups = createAsyncThunk(
  'fetchGroups',
  async (_, { getState }) => {
    const api = new GroupsApi();
    const groups: GetGroupsSuccessDto = await api.groupsControllerGetGroups();
    // console.log(groups);
    return groups;
  }
)

//https://redux-toolkit.js.org/api/createSlice
export const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [fetchGroups.fulfilled.type]: (state, action: PayloadAction<GetGroupsSuccessDto>) => {
      groupsAdapter.addMany(state, action.payload.groups) //add posts to ids and entities
    }
  }
})

export default groupsSlice.reducer;