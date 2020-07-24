// Functions for creating documents quickly for unit tests

import { User } from '../user/user.schema';
import { DocumentType } from '@typegoose/typegoose';
import { UserModel, PostModel } from '../mongoModels';
import { Post } from '../posts/post.schema';

export async function createTestUser(userID?: string, name?: string, gitHubID?: number): Promise<DocumentType<User>> {
  // required fields for new user: gitHubID and name
  if (!userID) {
    userID = "test-user";
  }
  if (!name) {
    name = "Test user";
  }
  if (!gitHubID) {
    gitHubID = 1;
  }
  const user = new UserModel();
  user.userID = userID;
  user.name = name;
  user.gitHubID = gitHubID;
  await user.save();
  return user;
}

export async function createTestPost(author: DocumentType<User>): Promise<DocumentType<Post>> {
  const post = new PostModel();
  post.title = "Test post";
  post.content = "Test post content";
  post.author = author;
  await post.save();
  return post;
}
