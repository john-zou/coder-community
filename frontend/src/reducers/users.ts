import produce from 'immer';

import { ReduxAction } from '../actions/constants';
import { UsersState } from '../store';

//https://immerjs.github.io/immer/docs/example-reducer
export const users = produce((state: UsersState, action: ReduxAction) => {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_SUCCESS": {
      action.payload.users.forEach(user => state[user._id] = user);
    }
  }
}, {});