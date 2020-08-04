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
  likes: number, // Renamed from likesCount to match updated MongoDB schema
  comments: string[],
  commentsCount: number,
  views: number,
  createdAt: string,
  // likedByUser: boolean, // Removed for simplicity. use state.user.likedPosts instead.
  slug: string,
  group?: string,
};

export type HNPost = {
  id: string,
  author?: string,
  title?: string,
  url?: string,
  // comments?: string[],
  // commentsCount?: number,
  createdAt: number,
};

export type PostsCreation = {
  _id: string,
  title: string,
  content: string,
  tags: any[] // [Record<string, Loadable<Tag>>]
};

export type Tag = {
  _id: string,
  name: string,
  postsSet: Record<string, boolean>, // posts that have this tag, that Redux is aware of
};

export type User = {
  _id: string,
  userID: string,
  gitHubID?: number,
  name: string,
  profilePic?: string,
  profileBanner?: string,
  status?: string,
  followers?: string[],//list of ids
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

// export type Video = {
//   _id: string,
//   author: string,
//   name: string,
//   description: string,
//   likesCount: number,
//   commentsCount: number,
//   comments: string[],
//   createdAt: string,
//   updatedAt: string,
// };

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