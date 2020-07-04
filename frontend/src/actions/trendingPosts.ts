import { TrendingApi } from '../api';
import { Post, User, Tag } from '../store';
import { convertArrToMap } from '../util/helperFunctions';
import { ReduxAction } from './constants';

const fetchingInitialTrendingPostsBegin = (): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_PENDING",
})

const fetchInitialTrendingPostsSuccess = (posts, users, tags, postIDs): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_SUCCESS",
  payload: {
    posts,
    users,
    tags,
    postIDs,
  }
})

const fetchInitialTrendingPostsFailure = (error): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_FAILURE",
  payload: {
    error
  }
})

export const setInitialTrendingPosts = () => {
  return async function (dispatch) {
    dispatch(fetchingInitialTrendingPostsBegin());
    try {
      const api = new TrendingApi({ basePath: "http://localhost:3001" });
      const initialData = await api.trendingControllerGetTrending(); //{posts: [], users: []}
      const posts: Record<string, Post> = convertArrToMap(initialData.posts);
      const users: Record<string, User> = convertArrToMap(initialData.users);
      const tags: Record<string, Tag> = convertArrToMap(initialData.tags);
      const postIDs: string[] = Object.keys(posts);
      dispatch(fetchInitialTrendingPostsSuccess(posts, users, tags, postIDs));
    }
    catch (err) {
      dispatch(fetchInitialTrendingPostsFailure(err));
    }
  }
};