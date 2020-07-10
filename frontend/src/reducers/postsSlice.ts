import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {
    TrendingApi,
    GetInitialDataLoggedInDto,
    GetInitialDataDto,
    PostsApi,
    GetPostDetailsSuccessDto,
    GetPostsByTagDto
} from "../api";
import {RootState} from "./rootReducer";
import {Post, PostsCreation} from "../store/types";
import {PostIDPayload} from './userSlice';
import {submitPost, updatePost} from "./postsCreationSlice";
import {UpdatePostSuccessDto} from "../../../backend/src/posts/dto/posts.dto";


const postsAdapter = createEntityAdapter<Post>({
    selectId: item => item._id
});

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchTrendingPosts = createAsyncThunk(
    'fetchTrendingPosts',
    async (_, {getState}) => {
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
);

// The backend endpoint can also take optional parameters for excluded post IDs and startIdx
export const fetchPostsByTag = createAsyncThunk(
    'fetchPostsByTag',
    ({tagID /* May add optional parameters here */}: { tagID: string }) => {
        return new PostsApi().tagsControllerGetPostsByTag(tagID /* May add optional parameters here */);
    }
)

export const fetchPostBySlug = createAsyncThunk(
    'fetchPostBySlug',
    ({slug, getAuthor}: { slug: string, getAuthor: boolean }) => new PostsApi().postsControllerGetPostBySlug(slug, getAuthor)
)

//https://redux-toolkit.js.org/api/createSlice
export const postsSlice = createSlice({
    name: "posts",
    initialState: postsAdapter.getInitialState<{ trendingPosts: string[], trendingPostsSet: Record<string, boolean>, slugToID: Record<string, string> }>({ //extends EntityState
        trendingPosts: [],
        trendingPostsSet: {},
        slugToID: {},
    }),//also has ids[] and entities{}
    reducers: {
        incrementPostLikes: (state, action: PayloadAction<PostIDPayload>) => {
            ++state.entities[action.payload.postID].likes;
        },
        decrementPostLikes: (state, action: PayloadAction<PostIDPayload>) => {
            --state.entities[action.payload.postID].likes;
        }
    },
    extraReducers: {
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
        [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
            const post = action.payload.post;
            const _id = post._id;
            state.slugToID[post.slug] = _id;
            postsAdapter.upsertOne(state, post);
        },
        [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
            postsAdapter.upsertMany(state, action.payload.posts);
        },
        [submitPost.fulfilled.type]: (state, action: PayloadAction<Post>) => {
            console.log("***" + action.payload);
            const newPost = action.payload;
            postsAdapter.addOne(state, newPost);
            // action.payload === ****

            // export function postsReducer(state = initialState, action) {
            // switch (action.type)
            //    case SUBMIT_POST_FULFILLED:
            //           return updated state
        },
        /*
        [updatePost.fulfilled.type]: (state, action: PayloadAction<UpdatePostSuccessDto>) => {
            const newPost = action.payload.CreatePostBodyDto;
            postsAdapter.updateOne(state, newPost);
        }
        */
    }
})

export default postsSlice.reducer;