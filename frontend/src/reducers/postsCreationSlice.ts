import {CreatePostBodyDto, PostsApi, UpdatePostBodyDto} from '../api/api';
import {Post, Tag} from "../store/types";
import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

/*
export const submitPost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    // console.log("POST CREATE SLICE");
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                // user: {_id: "5f07dd25be9a5c6510208dce"} // curUser._id }
            }),
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
}
*/

/*
export const updatePost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    // const slug = urlSlug(createdPost.title);
    console.log(createdPost.slug);
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts/${createdPost.slug}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                // user: { _id: "5eeebd4d1333dd0f79ca9be3" } //curUser._id }
            }),
        }).catch(e => console.log(e))
    }
}
*/

export const submitPost = createAsyncThunk(
  'submitPost',
  async (createdPost: CreatePostBodyDto & { author: string }) => {
    // console.log("SLICE::SUBMITPOST");
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
    // console.log("SLICE::UPDATEPOST");
    // console.log(update);
    // console.log(slug);
    const {_id, slug: newSlug} = await new PostsApi().postsControllerUpdatePostBySlug(update, slug);
    return {_id, slug: newSlug, oldSlug: slug, updated: update};
  }
);
