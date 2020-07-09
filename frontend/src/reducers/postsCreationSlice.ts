import {PostsApi, ShopApi} from '../api/api';
import {PostsCreation, Tag} from "../store/types";
import {CreatePostBodyDto} from "../../../backend/src/posts/dto/posts.dto";
import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

const postsCreationAdapter = createEntityAdapter<PostsCreation>({
    selectId: item => item._id
})

export const initialState = {
    _id: '',
    title: '',
    content: '',
    tags: []
}

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

//https://redux-toolkit.js.org/api/createSlice
export const postsCreationSlice = createSlice({
    name: "postsCreation",
    initialState, //: postsCreationAdapter.getInitialState(),
    reducers: {
        createTitle: (state, action) => {
            let updated = Object.assign({}, state);
            updated.title = action.payload;
            return updated;
        },
        createContent: (state, action) => {
            let updated = Object.assign({}, state);
            updated.content = action.payload;
            return updated;
        },
        createTags: (state, action) => {
            let updated = Object.assign({}, state);
            updated.tags = action.payload;
            return updated;
        }
    }
})

export const submitPost = createAsyncThunk(
    'submitPost',
    async(createdPost: any) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        return await new PostsApi().postsControllerCreatePost(newPost);
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async(slug: string, createdPost: any) => {
        let newPost: CreatePostBodyDto = {
            title: createdPost.title,
            content: createdPost.content,
            tags: createdPost.tags,
            featuredImg: ''
        }
        return await new PostsApi().postsControllerUpdatePostBySlug(slug, newPost);
    }
)

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
                user: { _id: "5eeebd4d1333dd0f79ca9be3" } //curUser._id }
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
export const testUpdatePost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }

    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                // user: { _id: "5eeebd4d1333dd0f79ca9be3" } //curUser._id }
            }),
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
}
 */


export default postsCreationSlice.reducer;

export const {
    createTitle, createContent, createTags
} = postsCreationSlice.actions;
