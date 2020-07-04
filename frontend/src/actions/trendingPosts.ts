import { TrendingApi } from '../api';
import { Post, User } from '../store';
import { convertArrToMap } from '../util/helperFunctions';
import { ReduxAction } from './constants';

export const fetchingInitialTrendingPostsBegin = (): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_PENDING",
})

const fetchInitialTrendingPostsSuccess = (posts, users, postIDs): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_SUCCESS",
  payload: {
    posts,
    users,
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
      const postIDs: string[] = Object.keys(posts);
      dispatch(fetchInitialTrendingPostsSuccess(posts, users, postIDs));
    }
    catch (err) {
      dispatch(fetchInitialTrendingPostsFailure(err));
    }
  }
};