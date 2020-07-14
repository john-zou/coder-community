import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchApi} from "../api";

/**
 * At this moment, not yet connected to Redux store proper to cache the results.
 */
export const search = createAsyncThunk(
    'search',
    async ({query}: {query: string}) => {
        const api = new SearchApi();
        const posts = await api.searchControllerSearch(query);
        return posts;
    });

