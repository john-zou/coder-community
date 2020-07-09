import * as urlSlug from 'url-slug';
import {PostsApi, ShopApi} from '../api/api';
import {PostsCreation, Tag} from "../store/types";
import {UpdatePostSuccessDto, CreatePostBodyDto, CreatePostSuccessDto} from "../../../backend/src/posts/dto/posts.dto";
import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

const postsCreationAdapter = createEntityAdapter<PostsCreation>({
    selectId: postCreation => postCreation._id
})

export const getAllShops = createAsyncThunk(
    'getAllShopsStatus',
    async () => {
        return await new ShopApi().shopControllerGetAllShops();
    }
);

export const createShop = createAsyncThunk(
    'createShopStatus',
    async (shop: any) => {
        const shopDto = {name: shop.name, description: shop.description};
        return await new ShopApi().shopControllerCreateShop(shopDto);
    }
)

export const submitPost = createAsyncThunk(
    'submitPost',
    async(createdPost: any) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        console.log(createdPost.title + " " + createdPost.content);
        return await new PostsApi().postsControllerCreatePost(newPost);
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async(createdPost: any) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        let body = {
            newPost: newPost,
            user: {_id: "5eeebd4d1333dd0f79ca9be3"}
        }
        const slug = urlSlug(createdPost.title);
        console.log("POST CREATION SLICE " + slug);
        // return await new PostsApi().postsControllerUpdatePostBySlug(slug, newPost);
        return await new PostsApi().postsControllerUpdatePostBySlug(slug, body);
    }
)

export const initialState = {
    _id: '',
    title: '',
    content: '',
    tags: []
}

export const postsCreationSlice = createSlice({
    name: "postsCreation",
    initialState: postsCreationAdapter.getInitialState(), //: postsCreationAdapter.getInitialState(),
    reducers: {

    },
    extraReducers: {
        [submitPost.fulfilled.type]: (state, action: PayloadAction<PostsCreation>) => {
            console.log("***" + action.payload);
            const newPost = action.payload;
            postsCreationAdapter.addOne(state, newPost);
        },
        [updatePost.fulfilled.type]: (state, action: PayloadAction<UpdatePostSuccessDto>) => {
            const newPost = action.payload.CreatePostBodyDto;
            postsCreationAdapter.updateOne(state, newPost);
        }
    }
})

/*
export const submitPost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                user: {_id: "5eeebd4d1333dd0f79ca9be3"} //curUser._id }
            }),
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
}


export const updatePost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    const slug = urlSlug(createdPost.title);
    console.log(slug);
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts/${slug}`, {
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

export default postsCreationSlice.reducer;
