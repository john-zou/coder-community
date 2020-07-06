import produce from "immer";
import { UsersState } from "../store";
import { ReduxAction } from "../actions/constants";

//https://immerjs.github.io/immer/docs/example-reducer
export const tags = produce((state: UsersState, action: ReduxAction) => {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_SUCCESS": {
      const tagsMap = action.payload.tags;
      Object.keys(tagsMap).forEach(_id => state[_id] = { loading: false, item: tagsMap[_id] });
    }
  }
}, {});