import { GroupsService } from './groups.service';
import { MockMongo } from '../util/mock-mongo';
import { GroupModel, PostModel, TagModel, UserModel } from '../mongoModels';

describe('GroupsService', () => {
  let service: GroupsService;

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
      await GroupModel.collection.drop();
    } catch (err) {
      // do nothing
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
