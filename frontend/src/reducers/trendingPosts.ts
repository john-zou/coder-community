import { ReduxAction } from '../actions/constants';
import { LoadableIDs } from '../store';


export function trendingPosts(state: LoadableIDs = { loading: false }, action: ReduxAction) {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_PENDING": {
      return {
        ...state,
        loading: true,
      }
    }
    case "INITIAL_TRENDING_POSTS_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: true,
        items: action.payload.postIDs,
      }
    }
    case "INITIAL_TRENDING_POSTS_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }
    // case "LIKE_POST":
    //   const copiedTrendingPosts = [...state];
    //   const likedPostIndex = copiedTrendingPosts.findIndex(
    //     (post) => post.postID === action.post.postID
    //   );
    //   if (action.isLiked) {
    //     copiedTrendingPosts[likedPostIndex].likedByUser = true;
    //     copiedTrendingPosts[likedPostIndex].likes++;
    //   }
    //   else {
    //     copiedTrendingPosts[likedPostIndex].likedByUser = false;
    //     copiedTrendingPosts[likedPostIndex].likes--;
    //   }
    //   return copiedTrendingPosts;
    default:
      return state;
  }
}
