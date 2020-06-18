import { TrendingPost } from "../initialData";

export const savePost = (post: TrendingPost) => ({
  type: "SAVE_POST",
  post,
});

export const likePost = (post: TrendingPost) => ({
  type: "LIKE_POST",
  post,
});

export const viewPost = (post: TrendingPost) => ({
  type: "VIEW_POST",
  post,
});
