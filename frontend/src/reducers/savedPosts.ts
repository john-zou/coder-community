import { SavedPost } from "../store/index-old";

export function savedPosts(state = Array<SavedPost>(), action): SavedPost[] {
  switch (action.type) {
    case "SAVE_POST": {
      return [...state, action.post];
    }
    default:
      return state;
  }
}
