import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTrendingPosts, fetchPostBySlug, fetchPostsByTag} from "./postsSlice";
import {Tag} from "../store/types";
import {GetInitialDataDto, GetInitialDataLoggedInDto, GetPostDetailsSuccessDto, GetPostsByTagDto} from "../api";

const tagsAdapter = createEntityAdapter<Tag>({
    selectId: item => item._id
})

// See Tag in store/types.ts
export const tagsSlice = createSlice({
    name: "users",
    initialState: tagsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // Initialize Tags slice when initial data is fetched
        [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
            if (state.ids.length > 0) {
              // Ignore the tags if we already have the tags
              // (We have all the tags if we have any tag)
              return;
            }

            action.payload.tags.forEach(({_id, name}) => {
              const tag: Tag = {
                _id,
                name,
                posts: [],
                gotAllPostsFromBackend: false,
                fetchCount: -1, // initialized to -1 so that the first one is zero
              }
              tagsAdapter.upsertOne(state, tag);
            })
        },

        [fetchPostsByTag.pending.type]: (state, action) => {
          // console.log('fetchPostsByTag/pending .. action', action);
          const tagID = action.meta.arg.tagID;
          state.entities[tagID].fetchCount++;
        },

        // Update Tags when posts are fetched by tag
        [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
            action.payload.posts.forEach(post => {
              if (!state.entities[action.payload.tagID].posts.includes(post._id)) {
                state.entities[action.payload.tagID].posts.push(post._id);
              }
            });
        },

        [fetchPostsByTag.rejected.type]: (state, action) => {
          const tagID = action.meta.arg.tagID;
          state.entities[tagID].gotAllPostsFromBackend = true;
        }
    }
});

export default tagsSlice.reducer;