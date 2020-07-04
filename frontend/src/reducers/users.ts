import produce from 'immer';

import { ReduxAction } from '../actions/constants';
import { UsersState } from '../store';

//https://immerjs.github.io/immer/docs/example-reducer
export const users = produce((state: UsersState, action: ReduxAction) => {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_SUCCESS": {
      const usersMap = action.payload.users;
      Object.keys(usersMap).forEach(_id => state[_id] = { loading: false, item: usersMap[_id] });
    }
  }
}, {});