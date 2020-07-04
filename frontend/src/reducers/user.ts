import { ReduxAction } from '../actions/constants';
import { Loadable, User } from '../store';

export function user(state: Loadable<User> = { loading: false }, action: ReduxAction) {
  switch (action.type) {
    case "USER_PENDING": {
      return {
        ...state,
        loading: true,
      }
    }
    case "USER_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        item: action.payload.user,
      }
    }
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
