import { Post } from "../store";

export function savedPosts(state = Array<Post>(), action): Post[] {
  switch (action.type) {
    case "SAVE_POST": {
      return [...state, action.post];
    }
    default:
      return state;
  }
}
