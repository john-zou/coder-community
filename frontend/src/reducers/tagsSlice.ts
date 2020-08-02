import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTrendingPosts, fetchPostBySlug, fetchPostsByTag} from "./postsSlice";
import {updatePost, submitPost} from "./postsCreationSlice";
import {Tag} from "../store/types";
import {
  GetInitialDataDto,
  GetInitialDataLoggedInDto,
  GetPostDetailsSuccessDto,
  GetPostsByTagDto, PostDto, UpdatePostBodyDto,
  UpdatePostSuccessDto
} from "../api";

const tagsAdapter = createEntityAdapter<Tag>({
  selectId: item => item._id
})

//https://redux-toolkit.js.org/api/createSlice
export const tagsSlice = createSlice({
  name: "users",
  initialState: tagsAdapter.getInitialState<{ hasMorePostsInTags: Record<string, boolean> }>({
    hasMorePostsInTags: {}
  }),
  reducers: {},
  extraReducers: {
    // Initialize Tags slice when initial data is fetched
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      // Create tags
      console.log("TAGSLICE::FETCHING TRENDING");
      tagsAdapter.upsertMany(state, action.payload.tags.map(tag => {
        const tagEntity = tag as unknown as Tag;
        tagEntity.postsSet = {};
        return tagEntity;
      }));

      // Update tags with trending posts
      action.payload.posts.forEach(post => {
        console.log(post);
        post.tags.forEach(id => {
          console.log(id);
          // For each tag in each post, add/update post to the tag in Redux store (idempotent)
          tagsAdapter.updateOne(state, {id, changes: {postsSet: {[post._id]: true}}});
        });
      });
      console.log(action.payload.posts);
      console.log(tagsAdapter);
      console.log(action.payload.tags);

      // Initialize hasMorePostsInTags
      action.payload.tags.forEach(tag => {
        state.hasMorePostsInTags[tag._id] = true;
      })
    },

    // Update Tags when a post is fetched
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      action.payload.post.tags.forEach(id => {
        tagsAdapter.updateOne(state, {id, changes: {postsSet: {[action.payload.post._id]: true}}});
      });
    },

    // TODO Update Tags when posts are fetched by tag
    [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
      const postsSet = {};
      action.payload.posts.forEach(post => {
        postsSet[post._id] = true
      });
      tagsAdapter.updateOne(state, {id: action.payload.tagID, changes: {postsSet}});
    },

    // payload is tagID
    [fetchPostsByTag.rejected.type]: (state, action: PayloadAction<string>) => {
      state.hasMorePostsInTags[action.payload] = false;
    },

    // TODO: add post to tags upon post creation
    [submitPost.fulfilled.type]: (state, action: PayloadAction<PostDto>) => {
      console.log(action.payload);
      const post = action.payload;
        post.tags.forEach(tag => {
          tagsAdapter.updateOne(state, {id: tag, changes: {postsSet: {[post._id]: true}}});
       });
    },
    // TODO: potentially update tags upon post update
    [updatePost.fulfilled.type]: (state, action) => {
      // console.log("STAGSLICE::UPDATEPOST");
      // console.log(action.payload);
      // console.log(action.payload.post);
      // action.payload.updated.tags.forEach(tag => {
      //   console.log(tag);
      // });
      // console.log(state.entities);
      // console.log(state.entities.postSets);
      // // tagsAdapter.upda
    },
  }
});

export default tagsSlice.reducer;