import * as mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';

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
      started = true;
    } else {
      // tear down
      await mongoose.disconnect();
      started = false;
    }
  } else {
    // In-memory database
    if (!started) {
      mockMongoose = new MockMongoose(mongoose);
      await mockMongoose.prepareStorage();
      started = true;
    } else {
      await mockMongoose.killMongo();
      started = false;
    }
  }
}
