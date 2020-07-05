import { LoadableIDs } from "../store";
import { ReduxAction } from "../actions/constants";

export const browsingGroups = (state: LoadableIDs = { loading: false }, action: ReduxAction) => {
  switch (action.type) {
    case "GROUPS_PENDING": {
      return {
        ...state,
        loading: true,
        error: undefined,
      }
    }
    case "GROUPS_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: undefined,
        items: action.payload.groupIDs,
      }
    }
    case "GROUPS_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }
    default:
      return state;
  }
}