import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTrendingPosts, fetchPostBySlug, fetchPostsByTag } from "./postsSlice";
import { Tag } from "../store/types";
import { GetInitialDataDto, GetInitialDataLoggedInDto, GetPostDetailsSuccessDto, GetPostsByTagDto } from "../api";

const tagsAdapter = createEntityAdapter<Tag>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createSlice
export const tagsSlice = createSlice({
  name: "users",
  initialState: tagsAdapter.getInitialState<{ hasMorePostsInTags: Record<string, boolean> }>({
    hasMorePostsInTags: {}
  }),
  reducers: {

  },
  extraReducers: {
    // Initialize Tags slice when initial data is fetched
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      // Create tags
      tagsAdapter.upsertMany(state, action.payload.tags.map(tag => {
        const tagEntity = tag as unknown as Tag;
        tagEntity.postsSet = {};
        return tagEntity;
      }));

      // Update tags with trending posts
      action.payload.posts.forEach(post => {
        post.tags.forEach(id => {
          // For each tag in each post, update the tag in Redux store
          tagsAdapter.updateOne(state, { id, changes: { postsSet: { [post._id]: true } } });
        });
      });

      // Initialize hasMorePostsInTags
      action.payload.tags.forEach(tag => {
        state.hasMorePostsInTags[tag._id] = true;
      })
    },

    // Update Tags when a post is fetched
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      action.payload.post.tags.forEach(id => {
        tagsAdapter.updateOne(state, { id, changes: { postsSet: { [action.payload.post._id]: true } } });
      });
    },

    // TODO Update Tags when posts are fetched by tag
    [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
      const postsSet = {};
      action.payload.posts.forEach(post => { postsSet[post._id] = true });
      tagsAdapter.updateOne(state, { id: action.payload.tagID, changes: { postsSet } });
    },

    // payload is tagID
    [fetchPostsByTag.rejected.type]: (state, action: PayloadAction<string>) => {
      state.hasMorePostsInTags[action.payload] = false;
    }

    // TODO: add post to tags upon post creation
    // TODO: potentially update tags upon post update
  }
});

export default tagsSlice.reducer;