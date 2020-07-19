import { Test, TestingModule } from '@nestjs/testing';
import { CommentsGateway } from './comments.gateway';
import { drop, MockMongo } from '../util/mock-mongo';
import { CommentModel, ConversationModel, PostModel, UserModel } from '../mongoModels';
import { ReturnModelType } from '@typegoose/typegoose';
import { CommentRoot } from './comment.schema';

describe('CommentsGateway', () => {

  beforeAll(MockMongo);
  afterAll(MockMongo);
  afterEach(() => drop(UserModel, PostModel, CommentModel));

  it('Testing', async () => {
    const user = new UserModel();
    user.userID = 'test-user';
    user.gitHubID = 1;
    user.name = 'Test User';
    await user.save();

    const post = new PostModel();
    post.author = user;
    post.title = "Test post";
    post.content = "Test post content";
    await post.save();

    const comment = new CommentModel();
    comment.author = user;
    comment.content = "hello world";
    comment.commentRoot = CommentRoot.POST;
    comment.parentPost = post;
    await comment.save();

    post.comments.push(comment);
    await post.save();

    const comments = (await PostModel.findById(post._id).populate('comments').lean()).comments;
    console.log("Boop");
  })
});
