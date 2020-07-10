import * as urlSlug from 'url-slug';
import {PostsApi} from '../api/api';
import {Post, PostsCreation, Tag} from "../store/types";
import {UpdatePostSuccessDto, CreatePostBodyDto, CreatePostSuccessDto} from "../../../backend/src/posts/dto/posts.dto";
import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

/*
const postsCreationAdapter = createEntityAdapter<PostsCreation>({
    selectId: postCreation => postCreation._id
})
*/

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

export const submitPost = createAsyncThunk(
    'submitPost',
    async(createdPost: CreatePostBodyDto & {author: string}) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        // console.log(createdPost.title + " " + createdPost.content);
        const createPostSuccessDto = await new PostsApi().postsControllerCreatePost(newPost);
        const { _id, slug } = createPostSuccessDto;
        const post: Post = {
            featuredImg: "",
            likes: 0,
            tags: [],
            title: "",
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

/*
export const updatePost = createAsyncThunk(
    'updatePost',
    async(createdPost: any & {slug: string}) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        let body = {
            newPost: newPost,
            // user: {_id: "5eeebd4d1333dd0f79ca9be3"}
        }
        // const slug = urlSlug(createdPost.title);
        console.log("POST CREATION SLICE " + createdPost.slug);
        // return await new PostsApi().postsControllerUpdatePostBySlug(slug, newPost);
        return await new PostsApi().postsControllerUpdatePostBySlug(createdPost.slug, body);
    }
}
*/

/*
export const postsCreationSlice = createSlice({
    name: "postsCreation",
    initialState: postsCreationAdapter.getInitialState(), //: postsCreationAdapter.getInitialState(),
    reducers: {

    },
    extraReducers: {

    }
})

export default postsCreationSlice.reducer;
*/