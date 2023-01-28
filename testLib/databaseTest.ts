import database from '../src/loaders/database';
import { DATABASE_DATA, TEST_DB } from './testsConstants';

export async function insertData() {
  console.log('inserting data');
  if ((await (await database()).collection('test').count()) === 0) {
    for (const item of DATABASE_DATA) {
      await (await database()).collection(TEST_DB).insertOne(item);
    }
  }
}
