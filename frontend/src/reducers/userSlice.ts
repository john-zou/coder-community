import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../api";

const userAdapter = createEntityAdapter<User>({
  selectId: item => item._id
})

export const getLoggedInUser = createAsyncThunk(
  '/user/getLoggedInUserStatus',
  async () => {
    const api = new UserApi();
    return await api.userControllerGetUser();
  }
)

export const getUserForViewProfile = createAsyncThunk(
  '/user/getUserForViewProfileStatus',
  async () => {
    //TODO
  }
)

//https://redux-toolkit.js.org/api/createSlice
export const userSlice = createSlice({
  name: "user",
  initialState: userAdapter.getInitialState<{ userOwnPosts: string[], savedPosts: string[] }>({ //extends EntityState
    userOwnPosts: [],
    savedPosts: [],
  }),//also has ids[] and entities{}
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action) => {
      userAdapter.addMany(state, action.payload.user)
    }
  }
})

export default userSlice.reducer;