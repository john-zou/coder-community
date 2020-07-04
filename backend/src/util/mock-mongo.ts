import { MockMongoose } from 'mock-mongoose';
import * as mongoose from 'mongoose';

import { disconnectMongo, initializeMongo } from '../mongoModels';
import { Secrets } from '../secrets';


let started = false;
let mockMongoose: MockMongoose;

/**
 * Set up in-memory database for use in testing when used in beforeAll; tears it down in after-all
 *
 * Usage: in `x.test.ts`
 *
 * ```javascript
 * import { MockMongo } from "path/to/util/mock-mongo"
 *
 * describe('Test Suite', () => {
 * // Local variables
 *
 * beforeAll(MockMongo);
 * afterAll(MockMongo);
 *
 * beforeEach({setup TestModule});
 * ```
 *
 */
export async function MockMongo(): Promise<void> {
  if (process.env.CI) {
    // GitHub action, true local MongoDB
    if (!started) {
      await initializeMongo(Secrets.MongoConnectionString)
      started = true;
    } else {
      await disconnectMongo();
      started = false;
    }
  } else {
    // Use in-memory DB (MockMongoose)
    if (!started) {
      mockMongoose = new MockMongoose(mongoose);
      await mockMongoose.prepareStorage();
      await initializeMongo(Secrets.MongoConnectionString);
      started = true;
    } else {
      await mockMongoose.killMongo();
      started = false;
    }
  }
}
