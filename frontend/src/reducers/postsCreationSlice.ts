import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { GetInitialDataLoggedInDto, GetInitialDataDto, TrendingApi } from "../api";
import {PostsCreation, Tag} from "../store/types";


const postsCreationAdapter = createEntityAdapter<PostsCreation>({
    selectId: item => item._id
})

export const initialState = {
    title: '',
    content: '',
    tags: []
}

//https://redux-toolkit.js.org/api/createSlice
export const postsCreationSlice = createSlice({
    name: "postsCreation",
    initialState: postsCreationAdapter.getInitialState(),
    reducers: {
        createTitle: (state, action) => {
            let updated = Object.assign({}, state);
            updated.entities.title = action.payload.title;
            return updated;
        },
        createContent: (state, action) => {
            let updated = Object.assign({}, state);
            updated.entities.content = action.payload.content;
            return updated;
        },
        createTags: (state, action) => {
            let updated = Object.assign({}, state);
            updated.entities.tags = action.payload.tags;
            return updated;
        }
    }
})

export default postsCreationSlice.reducer;

export const {
    createTitle, createContent, createTags
} = postsCreationSlice.actions;
