import { DocumentType } from '@typegoose/typegoose';
import { GetPostsByTagDto } from '../posts/dto/posts.dto';
import { NotFoundException } from '@nestjs/common';
import { TagModel, PostModel, UserModel } from '../mongoModels';
import { TagsService } from './tags.service';
import { MockMongo } from '../util/mock-mongo';
import { Post } from '../posts/post.schema';

describe('TagsService', () => {
  const service = new TagsService();

  beforeAll(MockMongo);
  afterAll(MockMongo);

  afterEach(async () => {
    // Drop collections (if exist)
    try {
      await UserModel.collection.drop();
    } catch (err) {
      // do nothing
    }
    try {
      await TagModel.collection.drop();
    } catch (err) {
      // do nothing
    }
    try {
      await PostModel.collection.drop();
    } catch (err) {
      // do nothing
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPostsByTag, tag does not exist, no posts in DB', async () => {
    let error;
    try {
      await service.getPostsByTag('507f191e810c19729de860ea');
    } catch (err) {
      console.log('Rejected with: ', err);
      error = err;
    }
    expect(error).toEqual(new NotFoundException());
  });

  it('getPostsByTag, tag exists, no posts in DB', async () => {
    const tag = new TagModel({ name: 'test tag' });
    await tag.save();
    const actual = await service.getPostsByTag(tag._id);
    const expected: GetPostsByTagDto = {
      cursor: 0,
      posts: [],
      tagID: tag._id,
    };
    expect(actual).toEqual(expected);
  });

  it('getPostsByTag, tag exists, 1 post in DB without the tag', async () => {
    const tag = new TagModel({ name: 'test tag' });
    await tag.save();
    // Post without tag
    const post = new PostModel();
    await post.save();
    const actual = await service.getPostsByTag(tag._id);
    const expected: GetPostsByTagDto = {
      cursor: 0,
      posts: [],
      tagID: tag._id,
    };
    expect(actual).toEqual(expected);
  });

  it('getPostsByTag, tag exists, 1 post in DB without the tag, 1 post in DB with the tag', async () => {
    const tag = new TagModel({ name: 'test tag' });
    await tag.save();
    // Post without tag
    const postWithoutTag = new PostModel();
    await postWithoutTag.save();

    const author = new UserModel();
    author.userID = 'test-user';
    author.gitHubID = 1;
    author.name = 'Test User';
    await author.save();

    // Post with the tag
    const postWithTag: DocumentType<Post> = new PostModel();
    postWithTag.author = author._id;
    await postWithTag.save();

    // Hook up the post and the tag
    tag.posts = [postWithTag._id];
    postWithTag.tags.push(tag._id);

    await tag.save();
    await postWithTag.save();

    const actual = await service.getPostsByTag(tag._id);

    expect(actual.tagID).toEqual(tag._id);
    expect(actual.posts).toHaveLength(1);
    expect(actual.posts[0]._id).toBe(postWithTag._id.toString());
    expect(actual.posts[0].tags).toHaveLength(1);
    expect(actual.posts[0].tags[0]).toBe(tag._id.toString());
  });

  it('getPostsByTag, default parameters', async () => {
    // SETUP

    // Create a user
    const author = new UserModel();
    author.userID = 'test-user';
    author.gitHubID = 1;
    author.name = 'Test User';
    await author.save();

    // Create a tag
    const tag = new TagModel({ name: "test tag" });
    await tag.save();

    // Create the following posts, where W = with, WO = without tag:
    // [WO W WO W W W W W]
    // Create 1 post without this tag
    const p0 = new PostModel();
    await p0.save();

    // Create 1 post with this tag
    const p1 = new PostModel();
    p1.tags.push(tag._id);
    p1.author = author._id;
    await p1.save();

    // Create another post without this tag
    const p2 = new PostModel();
    await p2.save();

    // Create 5 posts with this tag
    const p3 = new PostModel();
    const p4 = new PostModel();
    const p5 = new PostModel();
    const p6 = new PostModel();
    const p7 = new PostModel();

    p3.author = author._id;
    p4.author = author._id;
    p5.author = author._id;
    p6.author = author._id;
    p7.author = author._id;

    p3.tags.push(tag._id);
    p4.tags.push(tag._id);
    p5.tags.push(tag._id);
    p6.tags.push(tag._id);
    p7.tags.push(tag._id);

    await p3.save();
    await p4.save();
    await p5.save();
    await p6.save();
    await p7.save();

    tag.posts = [p1._id, p3._id, p4._id, p5._id, p6._id, p7._id];
    await tag.save();

    // CALL API
    const actual = await service.getPostsByTag(tag._id);

    expect(actual.tagID).toEqual(tag._id);
    expect(actual.posts).toHaveLength(5);
    expect(actual.posts[0]._id).toBe(p1._id.toString());
    expect(actual.posts[0].tags).toHaveLength(1);
    expect(actual.posts[0].tags[0]).toBe(tag._id.toString());

    expect(actual.posts[1]._id).toBe(p3._id.toString());
    expect(actual.posts[1].tags).toHaveLength(1);
    expect(actual.posts[1].tags[0]).toBe(tag._id.toString());

    expect(actual.posts[2]._id).toBe(p4._id.toString());
    expect(actual.posts[2].tags).toHaveLength(1);
    expect(actual.posts[2].tags[0]).toBe(tag._id.toString());

    expect(actual.posts[3]._id).toBe(p5._id.toString());
    expect(actual.posts[3].tags).toHaveLength(1);
    expect(actual.posts[3].tags[0]).toBe(tag._id.toString());

    expect(actual.posts[4]._id).toBe(p6._id.toString());
    expect(actual.posts[4].tags).toHaveLength(1);
    expect(actual.posts[4].tags[0]).toBe(tag._id.toString());
  });
});
