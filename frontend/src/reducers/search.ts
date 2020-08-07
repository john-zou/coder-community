import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchApi } from "../api";

export const search = createAsyncThunk(
  'search',
  async ({ query }: { query: string }) => {
    const api = new SearchApi();
    const posts = await api.searchControllerSearch(query);
    return posts;
  });

