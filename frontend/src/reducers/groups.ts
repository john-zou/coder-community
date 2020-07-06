import { GroupsState } from "../store";
import produce from "immer";
import { ReduxAction } from "../actions/constants";
import { convertIDArrToLoadableIDs } from "../util/helperFunctions";

export const groups = produce((state: GroupsState, action: ReduxAction) => {
  switch (action.type) {
    case "GROUPS_SUCCESS": {
      const groupsMap = action.payload.groupMap;
      console.log(groupsMap);
      Object.keys(groupsMap).forEach(_id => {
        const group = groupsMap[_id];
        group.users = convertIDArrToLoadableIDs(group.users);
        group.posts = convertIDArrToLoadableIDs(group.posts);
        group.videos = convertIDArrToLoadableIDs(group.videos);
        state[_id] = { loading: false, item: groupsMap[_id] }
      });
    }
  }
}, { loading: false });
