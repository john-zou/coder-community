import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetGroupMembersAndPostsDto,
  GetInitialDataDto,
  GetInitialDataLoggedInDto,
  GetPostDetailsSuccessDto,
  GetPostsByTagDto,
  GetPostsSuccessDto,
  PostsApi,
  TrendingApi,
  UpdatePostBodyDto,
  UpdatePostSuccessDto
} from "../api";
import { RootState } from "./rootReducer";
import { Post, User } from "../store/types";
import { createCommentSuccess, getCommentsByPostIDSuccess } from "./commentsSlice";
import { GetCommentsServerToClientDto } from "../ws-dto/comments/dto/getCommentsByPostID.ws.dto";
import { CreateCommentServerToClientDto } from "../ws-dto/comments/dto/createComment.ws.dto";
import { PostIDPayload, toggleLikePost, userSlice } from './userSlice';
import { submitPost, updatePost } from "./postsCreationSlice";
import _ from "lodash";
import { fetchGroupMembersAndPosts } from "./groupsSlice";



const postsAdapter = createEntityAdapter<Post>({
  selectId: item => item._id
});

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchTrendingPosts = createAsyncThunk(
  'fetchTrendingPosts',
  async ({ fetchCount }: { fetchCount: number }, { getState, rejectWithValue }) => {
    const api = new TrendingApi();
    let initialData: GetInitialDataLoggedInDto | GetInitialDataDto;
    const isLoggedIn = (getState() as RootState).isLoggedIn;
    console.log("fetchTrendingPosts... isLoggedIn:", isLoggedIn);
    try {
      if (isLoggedIn) {
        initialData = await api.trendingControllerGetTrendingLoggedIn(fetchCount);
      } else {
        initialData = await api.trendingControllerGetTrending(fetchCount);
      }
    } catch (err) {
      console.log("Got err from fetchTrendingPosts api call", err);
      return rejectWithValue(null);
    }

    return initialData; //{users[], posts[], tags[]}
  }
);

// The backend endpoint can also take optional parameters for excluded post IDs and startIdx
export const fetchPostsByTag = createAsyncThunk(
  'fetchPostsByTag',
  async ({ tagID, startIdx }: { tagID: string, startIdx: number }, { rejectWithValue }) => {
    let payload: GetPostsByTagDto;
    try {
      payload = await new PostsApi().tagsControllerGetPostsByTag(tagID, undefined, startIdx);
    } catch (err) {
      return rejectWithValue(tagID);
    }

    return payload;
  }
)

export const fetchPostBySlug = createAsyncThunk(
  'fetchPostBySlug',
  ({ slug, getAuthor }: { slug: string, getAuthor: boolean }) => new PostsApi().postsControllerGetPostBySlug(slug, getAuthor)
)

export const fetchPostByID = createAsyncThunk(
  'fetchPostByID',
  ({ id, getAuthor }: { id: string, getAuthor: boolean }) => {
    console.log(id, getAuthor);
    return new PostsApi().postsControllerGetPostByID(id, getAuthor)
  }
)

export const fetchPostsByUserID = createAsyncThunk(
  'fetchPostsByUserID',
  ({ userID }: { userID: string }) => new PostsApi().postsControllerGetPostsByUserID(userID)
)

//https://redux-toolkit.js.org/api/createSlice
export const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState<{
    trendingPosts: string[],
    trendingPostsSet: Record<string, boolean>,
    slugToID: Record<string, string>,
    trendingPostFetchCount: number,
    fetchedComments: Record<string, boolean>,
    hasMorePosts: boolean,
    updating: boolean,
  }>({ //extends EntityState
    trendingPosts: [],
    trendingPostsSet: {},
    slugToID: {},
    trendingPostFetchCount: 0,
    fetchedComments: {},
    hasMorePosts: true,//only for trending posts (of all tags)
    updating: false
  }),//also has ids[] and entities{}
  reducers: {
    deletePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload.postID);
      delete state.trendingPostsSet[action.payload.postID];
      _.pull(state.trendingPosts, action.payload.postID);
    }
  },
  extraReducers: {
    [fetchTrendingPosts.pending.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      state.trendingPostFetchCount++;
    },
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      action.payload.posts.forEach(post => {
        state.slugToID[post.slug] = post._id;
        if (!state.trendingPostsSet[post._id]) {
          state.trendingPostsSet[post._id] = true;
          state.trendingPosts.push(post._id);
        }
      })
      postsAdapter.upsertMany(state, action.payload.posts) //add posts to ids and entities
    },
    [fetchTrendingPosts.rejected.type]: (state, action) => {
      state.hasMorePosts = false;
    },
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      const post = action.payload.post;
      const _id = post._id;
      state.slugToID[post.slug] = _id;
      postsAdapter.upsertOne(state, post);
    },
    [fetchPostByID.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      const post = action.payload.post;
      const _id = post._id;
      state.slugToID[post.slug] = _id;
      postsAdapter.upsertOne(state, post);
    },
    [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
      postsAdapter.upsertMany(state, action.payload.posts);
    },
    'user/toggleLikePost': (state, action: PayloadAction<PostIDPayload & { increment: boolean }>) => {
      if (action.payload.increment) {
        state.entities[action.payload.postID].likes++;
      } else {
        state.entities[action.payload.postID].likes--;
      }
    },

    // Create and update post:
    [submitPost.fulfilled.type]: (state, action: PayloadAction<Post>) => {
      const newPost = action.payload;
      postsAdapter.addOne(state, newPost);
    },
    [updatePost.pending.type]: (state) => {
      state.updating = true
    },
    [updatePost.fulfilled.type]: (state, action: PayloadAction<UpdatePostSuccessDto & UpdatePostBodyDto>) => {
      state.slugToID[action.payload.slug] = state.slugToID[action.payload.oldSlug];
      console.log("POSTSLICE::UPDATEPOST");
      console.log(action.payload);
      // state.slugToID.delete(action.payload.slug);
      postsAdapter.updateOne(state, {
        id: action.payload._id,
        changes: action.payload
      });
      state.updating = false
      console.log("** UPDATE DONE **");
    },
    [getCommentsByPostIDSuccess.type]: (state, action: PayloadAction<GetCommentsServerToClientDto>) => {
      state.fetchedComments[action.payload.postID] = true;
    },
    [createCommentSuccess.type]: (state, action: PayloadAction<CreateCommentServerToClientDto>) => {
      if (action.payload.comment.commentRoot === 'post') {
        state.entities[action.payload.comment.parentPost].comments.push(action.payload.comment._id);
      }
    },
    [fetchPostsByUserID.fulfilled.type]: (state, action: PayloadAction<GetPostsSuccessDto>) => {
      postsAdapter.addMany(state, action.payload.posts)
    },
    [fetchGroupMembersAndPosts.fulfilled.type]: (state, action: PayloadAction<GetGroupMembersAndPostsDto>) => {
      postsAdapter.upsertMany(state, action.payload.posts)
    }
  }
})

export default postsSlice.reducer;
export const { deletePost } = postsSlice.actions;