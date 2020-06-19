export function currentViewedPost(state = null, action) {
  switch (action.type) {
    case "VIEW_POST":
      return action.post;
    default:
      return state;
  }
}
