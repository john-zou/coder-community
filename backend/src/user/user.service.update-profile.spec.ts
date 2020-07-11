import { MockMongo } from '../util/mock-mongo';
import { UserService } from './user.service';
import { TagModel, UserModel } from '../mongoModels';

describe('UserService::updateProfile', () => {
  const userService = new UserService();

  beforeAll(MockMongo);
  afterAll(MockMongo);

  afterEach(async () => {
    // Clean up
    try {
      await UserModel.collection.drop();
    } catch (err) {
      // do nothing
    }
  });

  it('Applies all changes correctly', async () => {
    const user = new UserModel();
    user.userID = 'test-user';
    user.gitHubID = 1;
    user.name = 'Test User';
    user.status = "Old Status";

    const tag1 = new TagModel();
    const tag2 = new TagModel();
    const tag3 = new TagModel();

    tag1.name = "t1";
    tag2.name = "t2";
    tag3.name = "t3";

    await tag1.save();
    await tag2.save();
    await tag3.save();

    user.tags = [tag1._id, tag2._id];

    await user.save();

    const expectedName = "new name";
    const expectedStatus = "new status";
    const expectedTags: string[] = [tag2._id.toString(), tag3._id.toString()];

    await userService.updateProfile(user._id.toString(), {
      name: expectedName,
      status: expectedStatus,
      tags: expectedTags,
    });

    // find the user again
    const userAgain = await UserModel.findById(user._id.toString());
    expect(userAgain.name).toEqual(expectedName);
    expect(userAgain.status).toEqual(expectedStatus);
    expect(userAgain.tags.map(tag => tag.toString())).toEqual(expectedTags);
  });
});