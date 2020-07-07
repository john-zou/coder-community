import { PostDetailsDto } from './../api/api';
import { createEntityAdapter, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TrendingApi, GetInitialDataLoggedInDto, GetInitialDataDto, PostsApi } from "../api";
import { RootState } from "./rootReducer";
import { Post } from "../store/types";


const postsAdapter = createEntityAdapter<Post>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchTrendingPosts = createAsyncThunk(
  'fetchTrendingPosts',
  async (_, { getState }) => {
    const api = new TrendingApi();
    let initialData: GetInitialDataLoggedInDto | GetInitialDataDto;
    const isLoggedIn = (getState() as RootState).isLoggedIn;
    console.log(isLoggedIn);
    if (isLoggedIn) {
      initialData = await api.trendingControllerGetTrendingLoggedIn();
    } else {
      initialData = await api.trendingControllerGetTrending();
    }
    console.log(initialData);
    return initialData; //{users[], posts[], tags[]}
  }
)

export const fetchPostBySlug = createAsyncThunk(
  'fetchPostBySlug',
  (slug: string) => new PostsApi().postsControllerGetPostBySlug(slug)
)

export const fetchPostContentByID = (ID: string) => createAsyncThunk(
  'fetchPostContentByID',
  async () => { } // TODO
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
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      state.trendingPosts.push(...action.payload.posts.map(post => post._id));
      postsAdapter.addMany(state, action.payload.posts) //add posts to ids and entities
    },
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<PostDetailsDto>) => {
      const _id = action.payload._id;
      state.slugToID[action.payload.slug] = _id;
      postsAdapter.upsertOne(state, action.payload);
    }
  }
})

export default postsSlice.reducer;