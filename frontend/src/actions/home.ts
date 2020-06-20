import { TrendingPost, CurrentViewedPost } from "../initialData";

export const savePost = (post: TrendingPost) => ({
  type: "SAVE_POST",
  post,
});

export const likePost = (post, isLiked) => ({
  type: "LIKE_POST",
  post,
  isLiked,
});

//set the currenViewedPost given the trending post
export const viewPost = (post: CurrentViewedPost) => ({
  type: "VIEW_POST",
  post,
});
