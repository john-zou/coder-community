import { ReduxAction } from '../actions/constants';
import { Loadable, User } from '../store';

export function user(state: Loadable<User> = { loading: false }, action: ReduxAction) {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_PENDING":
    case "USER_PENDING": {
      return {
        ...state,
        loading: true,
      }
    }
    case "INITIAL_TRENDING_POSTS_SUCCESS":
    case "USER_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        item: action.payload.user,
      }
    }
    case "INITIAL_TRENDING_POSTS_FAILURE":
    case "USER_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }
    default:
      return state;
  }
}
