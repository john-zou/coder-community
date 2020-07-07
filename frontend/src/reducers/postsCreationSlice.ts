import {createEntityAdapter, createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {PostsCreation, Tag} from "../store/types";

const postsCreationAdapter = createEntityAdapter<PostsCreation>({
    selectId: item => item._id
})

export const initialState = {
    _id: '',
    title: '',
    content: '',
    tags: []
}

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

export default postsCreationSlice.reducer;

export const {
    createTitle, createContent, createTags
} = postsCreationSlice.actions;
