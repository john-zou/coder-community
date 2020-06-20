export function currentViewedPost(state = null, action) {
  switch (action.type) {
    case "VIEW_POST": {
      return action.post;
    }
    case "LIKE_POST": {
      const copyCurrLikedPost = { ...state };
      if (action.isLiked) {
        copyCurrLikedPost.likedByUser = true;
        copyCurrLikedPost.likes++;
      } else {
        copyCurrLikedPost.likedByUser = false;
        copyCurrLikedPost.likes--;
      }
      return copyCurrLikedPost;
    }
    default:
      return state;
  }
}
