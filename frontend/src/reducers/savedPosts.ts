import { SavedPost } from "../initialData";

export function savedPosts(state = Array<SavedPost>(), action): SavedPost[] {
  switch (action.type) {
    case "SAVE_POST": {
      return [action.post, ...state];
    }
    default:
      return state;
  }
}
