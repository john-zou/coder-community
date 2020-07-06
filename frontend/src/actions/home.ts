import { Post } from "../store/types";

export const savePost = (post: Post) => ({
  type: "SAVE_POST",
  post,
});

export const likePost = (post, isLiked) => ({
  type: "LIKE_POST",
  post,
  isLiked,
});

//set the currenViewedPost given the trending post
export const viewPost = (post: Post) => ({
  type: "VIEW_POST",
  post,
});
