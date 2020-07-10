require("dotenv").config();
import { disconnectMongo, initializeMongo } from '../mongoModels';
import { Secrets } from '../secrets';


let started = false;

/**
 * Set up MongoDB during tests. It used to, but no longer, uses in-memory MongoDB.
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
  // GitHub
  if (process.env.CI) {
    if (!started) {
      await initializeMongo(Secrets.MongoConnectionString)
      started = true;
    } else {
      await disconnectMongo();
      started = false;
    }
  } else {
    // Computer
    if (!started) {
      await initializeMongo(Secrets.TestMongoConnectionString);
      started = true;
    } else {
      await disconnectMongo();
      started = false;
    }
  }
}
