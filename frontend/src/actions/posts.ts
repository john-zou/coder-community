import { User, Post } from "../store";

export const setInitialTrendingPosts = (posts: Record<string, Post>, users: Record<string, User>) => ({
  type: "SET_INITIAL_TRENDING_POSTS",
  posts,
  users,
});