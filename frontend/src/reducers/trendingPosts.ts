export function trendingPosts(state = [], action) {
  switch (action.type) {
    case "LIKE_POST":
      const copiedTrendingPosts = [...state];
      const likedPostIndex = copiedTrendingPosts.findIndex(
        (post) => post.postID === action.post.postID
      );
      if (action.isLiked) {
        copiedTrendingPosts[likedPostIndex].likedByUser = true;
        copiedTrendingPosts[likedPostIndex].likes++;
      }
      else {
        copiedTrendingPosts[likedPostIndex].likedByUser = false;
        copiedTrendingPosts[likedPostIndex].likes--;
      }
      return copiedTrendingPosts;
    default:
      return state;
  }
}
