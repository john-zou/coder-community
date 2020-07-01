import * as mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';

const mockMongeese: Record<number, MockMongoose> = {};

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
  if (!mockMongeese[process.pid]) {
    // Setup
    console.log('Setting up Mock Mongoose on process', process.pid);
    const mockMongoose = new MockMongoose(mongoose);
    mockMongeese[process.pid] = mockMongoose;
    await mockMongoose.prepareStorage();
  } else {
    // Teardown
    console.log('Tearing down Mock Mongoose on process', process.pid);
    const mockMongoose = mockMongeese[process.pid];
    delete mockMongeese[process.pid];
    await mockMongoose.killMongo();
  }
}
