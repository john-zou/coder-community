export type Attachment = {
  _id: string,
  url: string,
  fileType: string,
  extension: string,
  createdAt: string,
  updatedAt: string,
}

export type Comment = {
  _id: string,
  author: string,
  content: string,
  replies: string[], //list of comment ids
  commentRoot: string,
  likes: string[],
  likesCount: number,
  parentPost: string,
  parentComment: string,
  parentVideo: string,
  createdAt: string,
  updatedAt: string,
}

export type Conversation = {
  _id: string,
  name: string,
  users: string[],
  messages: string[],
  createdAt: string,
  updatedAt: string,
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
  attachments: string[],
  createdAt: string,
  updatedAt: string,
};

export type Post = {
  _id: string,
  author: string,
  title: string,
  previewContent?: string,
  content?: string,
  tags: string[],
  featuredImg: string,
  likesCount: number,
  comments: string[],
  commentsCount: number,
  views: number,
  createdAt: string,
  likedByUser: boolean,
  slug: string,
  group?: string,
}

export type Tag = {
  _id: string,
  name: string,
  posts: string[],
};

export type User = {
  _id: string,
  userID: string,
  gitHubID?: number,
  name: string,
  profilePic: string,
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

export type Video = {
  _id: string,
  author: string,
  name: string,
  description: string,
  likesCount: number,
  commentsCount: number,
  comments: string[],
  createdAt: string,
  updatedAt: string,
};
