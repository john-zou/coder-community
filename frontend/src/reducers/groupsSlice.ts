import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { Group } from "../store/types";

const groupsAdapter = createEntityAdapter<Group>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchGroups = createAsyncThunk(
  'fetchGroups',
  async (_, { getState }) => {
    const groups = null;
    const api = new
    // const api = new TrendingApi();
    // let initialData: GetInitialDataLoggedInDto | GetInitialDataDto;
    // const isLoggedIn = (getState() as RootState).isLoggedIn;
    // console.log(isLoggedIn);
    // if (isLoggedIn) {
    //   initialData = await api.trendingControllerGetTrendingLoggedIn();
    // } else {
    //   initialData = await api.trendingControllerGetTrending();
    // }
    // console.log(initialData);
    return groups; //{users[], posts[], tags[]}
  }
)

//https://redux-toolkit.js.org/api/createSlice
export const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [fetchGroups.fulfilled.type]: (state, action) => {
      // state.trendingPosts.push(...action.payload.posts.map(post => post._id));
      groupsAdapter.addMany(state, action.payload.groups) //add posts to ids and entities
    }
  }
})

export default groupsSlice.reducer;