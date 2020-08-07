export type Comment = {
  _id: string,
  author: string,
  content: string,
  replies?: string[], //list of comment ids
  commentRoot?: string,
  likes: number,
  parentPost?: string,
  parentComment?: string,
  parentVideo?: string,
  createdAt: number,
  updatedAt?: number,
}

export type Conversation = {
  _id: string,
  name: string,
  users: string[],
  messages: string[],
  createdAt?: number,
  updatedAt?: number,
}

export type Group = {
  _id: string,
  name: string,
  description: string,
  private: boolean,
  profilePic: string,
  profileBanner: string,
  admins: string[],
  users: string[],
  posts: string[],
  videos: string[],
  createdAt: string,
  updatedAt: string,
};

export type Message = {
  _id: string,
  author: string,
  text: string,
  createdAt: number,
  updatedAt?: number,
};

export type Post = {
  _id: string,
  author: string,
  title: string,
  previewContent?: string,
  content?: string,
  tags: string[],
  featuredImg: string,
  likes: number,
  comments: string[],
  commentsCount: number,
  views: number,
  createdAt: string,
  slug: string,
  group?: string,
};

export type HNPost = {
  id: string,
  author?: string,
  title?: string,
  url?: string,
  createdAt: number,
};

export type PostsCreation = {
  _id: string,
  title: string,
  content: string,
  tags: any[]
};

export type Tag = {
  _id: string,
  name: string,
  posts: string[],
  fetchCount: number,
  gotAllPostsFromBackend: boolean,
};

export type User = {
  _id: string,
  userID: string,
  gitHubID?: number,
  name: string,
  profilePic?: string,
  profileBanner?: string,
  status?: string,
  followers?: string[],
  following?: string[],
  groups?: string[],
  posts?: string[],
  savedPosts?: string[],
  likedPosts?: string[],
  tags?: string[],
  conversations?: string[],
  createdAt?: string,
  updatedAt?: string,
};

export interface CurrentLoggedInUser extends User {
  likedPostsSet: Record<string, boolean>;
  savedPostsSet: Record<string, boolean>;
  followingSet: Record<string, boolean>;
  followersSet: Record<string, boolean>;
}


export type Video = {
  _id: string,
  name: string,
  description: string,
  createdAt: string,
}

export type Question = {
  _id: string,
  title: string,
  content: string,
  solution: string,
}

export type Discussion = {
  _id: string,
  author: string,
  question: string,
  title: string,
  content: string,
}