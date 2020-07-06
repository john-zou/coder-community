import { TrendingApi, GetInitialDataLoggedInDto, GetInitialDataDto, UserDto } from '../api';
import RootState, { Post, User, Tag } from '../store';
import { convertArrToMap, convertArrToLoadableIDs } from '../util/helperFunctions';
import { ReduxAction } from './constants';

const fetchingInitialTrendingPostsBegin = (): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_PENDING",
})

const fetchInitialTrendingPostsSuccess = (posts, users, tags, postIDs, user?): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_SUCCESS",
  payload: {
    posts,
    users,
    tags,
    postIDs,
    user
  }
})

const fetchInitialTrendingPostsFailure = (error): ReduxAction => ({
  type: "INITIAL_TRENDING_POSTS_FAILURE",
  payload: {
    error
  }
})

export const setInitialTrendingPosts = () => {
  return async function (dispatch, getState) {
    dispatch(fetchingInitialTrendingPostsBegin());
    try {
      const api = new TrendingApi();
      let initialData: GetInitialDataLoggedInDto | GetInitialDataDto;
      const isLoggedIn = (getState() as RootState).isLoggedIn;
      if (isLoggedIn) {
        initialData = await api.trendingControllerGetTrendingLoggedIn();
      } else {
        initialData = await api.trendingControllerGetTrending(); //{posts: [], users: []}
      }
      const posts: Record<string, Post> = convertArrToMap(initialData.posts);
      const users: Record<string, User> = convertArrToMap(initialData.users);
      const tags: Record<string, Tag> = convertArrToMap(initialData.tags);
      const postIDs: string[] = Object.keys(posts);

      if (isLoggedIn) {
        const user: UserDto = (initialData as GetInitialDataLoggedInDto).user;
        // Convert user's array of references into LoadableIDs
        convertArrToLoadableIDs(user, "followers", "following", "groups", "posts", "savedPosts", "likedPosts", "tags", "conversations");
        dispatch(fetchInitialTrendingPostsSuccess(posts, users, tags, postIDs, user));
      } else {
        dispatch(fetchInitialTrendingPostsSuccess(posts, users, tags, postIDs));
      }
    }
    catch (err) {
      dispatch(fetchInitialTrendingPostsFailure(err));
    }
  }
};