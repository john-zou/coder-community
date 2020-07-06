import produce from "immer";
import { ReduxAction } from "../actions/constants";
import { SelectedTab } from "../store";

export const selectedTab = (state = "", action: ReduxAction) => {
  switch (action.type) {
    case "GROUPS_PENDING": {
      return SelectedTab.GROUPS;
    }
    default:
      return state;
  }
}