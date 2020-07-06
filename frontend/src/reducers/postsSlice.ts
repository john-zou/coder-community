import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetInitialDataLoggedInDto, GetInitialDataDto, TrendingApi } from "../api";
import { RootState } from "./rootReducer";
import { Post } from "../store/types";


const postsAdapter = createEntityAdapter<Post>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchTrendingPosts = createAsyncThunk(
  'posts/fetchTrendingPostsStatus',
  async (_, { getState }) => {
    const api = new TrendingApi();
    let initialData: GetInitialDataLoggedInDto | GetInitialDataDto;
    const isLoggedIn = (getState() as RootState).isLoggedIn;
    if (isLoggedIn) {
      initialData = await api.trendingControllerGetTrendingLoggedIn();
    } else {
      initialData = await api.trendingControllerGetTrending();
    }
    return initialData; //{users[], posts[], tags[]}
  }
)

export const fetchPostBySlug = (slug: string) => createAsyncThunk(
  'posts/fetchPostBySlugStatus',
  async () => { }
)

export const fetchPostContentByID = (ID: string) => createAsyncThunk(
  'posts/fetchPostContentByIDStatus',
  async () => { }
)

//https://redux-toolkit.js.org/api/createSlice
export const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState<{ trendingPosts: string[], slugToID: Record<string, string> }>({ //extends EntityState
    trendingPosts: [],
    slugToID: {},
  }),//also has ids[] and entities{}
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action) => {
      state.trendingPosts.push(...action.payload.posts.map(post => post._id));
      postsAdapter.addMany(state, action.payload.posts) //add posts to ids and entities
    }
  }
})

export default postsSlice.reducer;