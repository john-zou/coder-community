import { TrendingPost } from "../initialData";

export const savePost = (post: TrendingPost) => ({
  type: "SAVE_POST",
  post,
});
