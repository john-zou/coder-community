import produce from "immer";
import { ReduxAction } from "../actions/constants";
import { convertIDArrToLoadableIDs } from "../util/helperFunctions";
import { Entity } from "../store";

export const cache = produce((state: Record<string, Entity>, action: ReduxAction) => {
  switch (action.type) {
    case "INITIAL_TRENDING_POSTS_SUCCESS": {
      const postsMap = action.payload.posts;
      // console.log(postsMap);
      Object.keys(postsMap).forEach(_id => {
        const post = postsMap[_id];
        post.comments = convertIDArrToLoadableIDs(post.comments);
        post.tags = convertIDArrToLoadableIDs(post.tags);
        state[_id] = postsMap[_id];
      });
      const usersMap = action.payload.users;
      Object.keys(usersMap).forEach(_id => state[_id] = usersMap[_id]);
      return;
    }
    case "GROUPS_SUCCESS": {
      const groupsMap = action.payload.groupMap;
      console.log(groupsMap);
      Object.keys(groupsMap).forEach(_id => {
        const group = groupsMap[_id];
        group.users = convertIDArrToLoadableIDs(group.users);
        group.posts = convertIDArrToLoadableIDs(group.posts);
        group.videos = convertIDArrToLoadableIDs(group.videos);
        state[_id] = groupsMap[_id];
      });
      return;
    }
  }
}, {});