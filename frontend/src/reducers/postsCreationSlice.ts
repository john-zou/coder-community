import { CreatePostBodyDto, PostsApi, UpdatePostBodyDto } from '../api/api';
import { Post, Tag } from "../store/types";
import { createEntityAdapter, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const submitPost = createAsyncThunk(
  'submitPost',
  async (createdPost: CreatePostBodyDto & { author: string }) => {
    const createPostSuccessDto = await new PostsApi().postsControllerCreatePost(createdPost);
    const { _id, slug } = createPostSuccessDto;

    const post: Post = {
      featuredImg: createdPost.featuredImg,
      likes: 0,
      tags: createdPost.tags,
      title: createdPost.title,
      views: 0,
      _id: _id,
      slug: slug,
      author: createdPost.author,
      previewContent: createdPost.content.substr(0, 100),
      comments: [],
      commentsCount: 0,
      content: createdPost.content,
      createdAt: Date.now().toString(),
      group: createdPost.group
    }
    return post;
  }
)

export const updatePost = createAsyncThunk(
  'updatePost',
  async ({ update, slug }: { update: UpdatePostBodyDto, slug: string }) => {
    const { _id, slug: newSlug } = await new PostsApi().postsControllerUpdatePostBySlug(update, slug);
    return { _id, slug: newSlug, oldSlug: slug, updated: update };
  }
);
