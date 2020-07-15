import {CreatePostBodyDto, PostsApi, UpdatePostBodyDto} from '../api/api';
import {Post, Tag} from "../store/types";
import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

export const submitPost = createAsyncThunk(
    'submitPost',
    async (createdPost: CreatePostBodyDto & { author: string }) => {
        // console.log(createdPost.title + " " + createdPost.content);
        const createPostSuccessDto = await new PostsApi().postsControllerCreatePost(createdPost);
        const {_id, slug} = createPostSuccessDto;
        const post: Post = {
            featuredImg: createdPost.featuredImg,
            likes: 0,
            tags: createdPost.tags,
            title: createdPost.title,
            views: 0,
            _id: _id,
            slug: slug,
            author: createdPost.author,
            comments: [],
            commentsCount: 0,
            content: createdPost.content,
            createdAt: Date.now().toString()
        }
        return post;
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async ({update, slug}: { update: UpdatePostBodyDto, slug: string }) => {
        console.log(update);
        console.log(slug);
        const {_id, slug: newSlug} = await new PostsApi().postsControllerUpdatePostBySlug(update, slug);
        return {update, _id, slug: newSlug};
    }
);
