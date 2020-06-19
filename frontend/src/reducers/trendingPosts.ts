export function trendingPosts(state = [], action) {
  switch (action.type) {
    case "LIKE_POST":
      const copiedTrendingPosts = [...state];
      const likedPostIndex = copiedTrendingPosts.findIndex(
        (post) => post.postID === action.post.postID
      );
      copiedTrendingPosts[likedPostIndex].likes++;
      return copiedTrendingPosts;
    default:
      return state;
  }
}
