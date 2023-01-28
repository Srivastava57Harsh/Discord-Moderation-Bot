/// -------------------------------------------------------------------------------------- #
/// ** Moderation Test Function Handler **
/// This file contains the Moderation test functions director for the gm command
/// -------------------------------------------------------------------------------------- #
import { handleModeration } from '../src/helper/handleModeration';
import database from '../src/loaders/database';
import { message, messageType, TEST_DATE, TEST_DB, TEST_ID } from './testsConstants';
import { getGmMessage } from '../src/helper/gmChannel/gmCommand';
import { getGnMessage } from '../src/helper/gmChannel/gnCommand';

export async function moderationTestFunctionHandler(array: string[], testDescription: string) {
  describe(`${testDescription}`, () => {
    it('SHOULD RETURN TRUE IF MESSAGE CONTAINS BLACKLISTED WORDS', async () => {
      // console.log(array);
      for (let i = 0; i < array.length; i++) {
        message.content = array[i];
        // console.log('TESTING: ', message.content);
        await handleModeration(
          message,
          messageType.incomingUser.id,
          messageType.incomingUser.username,
          messageType.incomingUser.isMod,
          messageType.incomingUser.isAdmin,
          TEST_DB,
          true,
        );
        const dbResponse = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
        expect(dbResponse?.wasTimedOut).toBe(true);
        await (await database()).collection(TEST_DB).updateOne({ userId: TEST_ID }, { $set: { wasTimedOut: false } });
      }
    });
  });
}

export async function testGmMessageHandler() {
  const response = await getGmMessage(
    message,
    messageType.incomingUser.id,
    messageType.incomingUser.username,
    messageType.incomingUser.isMod,
    TEST_DB,
    TEST_DATE,
  );
  return response;
}

export async function testGnMessageHandler() {
  const response = await getGnMessage(
    message,
    messageType.incomingUser.id,
    messageType.incomingUser.username,
    messageType.incomingUser.isMod,
    TEST_DB,
    TEST_DATE,
  );
  return response;
}
