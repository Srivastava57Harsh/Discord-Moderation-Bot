/// -------------------------------------------------------------------------------------- #
/// ** GM TEST COMMAND HANDLER **
/// This file contains the test functions director for the gm command
/// -------------------------------------------------------------------------------------- #
import database from '../src/loaders/database';
import { testGmMessageHandler } from './moderationTestFunctionHandler';
import { GM_COMMAND, messageType, TEST_DATE, TEST_DB } from './testsConstants';

messageType.incomingMessage.content = GM_COMMAND;

export async function gmFirstDay() {
  describe('FIRST TIME ON FIRST DAY', () => {
    it('SHOULD RETURN THE CORRECT GM RECORD', async () => {
      const response = await testGmMessageHandler();
      expect(response).toBe(`gm **testUser**, you have said gm **1 day in a row** 🔥 and a total of 1 times 🥳`);
    });
  });
}

export async function gmSecondDay() {
  describe('SECOND CONSECUTIVE DAY', () => {
    const todaysDate = new Date(TEST_DATE);
    todaysDate.setHours(0, 0, 0, 0);
    todaysDate.setDate(todaysDate.getDate() - 1);

    it('SHOULD RETURN THE CORRECT GM RECORD', async () => {
      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gmLastDate: todaysDate.getTime(),
          },
        },
      );

      const response = await testGmMessageHandler();
      expect(response).toBe(
        `gm **testUser**, you have said gm **2 days in a row** 🔥 and a total of 2 times 🥳` ||
          //handlin edgecase when user enters the command at 12:00 am
          `gm **testUser**, you have said gm **1 day in a row** 🔥 and a total of 2 times 🥳`,
      );
    });
  });
}

export async function gmSameDay() {
  describe('ON THE SAME DAY', () => {
    it('SHOULD RETURN THE CORRECT GM RECORD', async () => {
      const response = await testGmMessageHandler();
      expect(response).toBe(`gm **testUser**, you have said gm **2 days in a row** 🔥 and a total of 2 times 🥳`);
    });
  });
}

export async function gmNonConsecutiveDay() {
  describe('ON A NON CONSECUTIVE DAY', () => {
    it('CASE I : SHOULD RETURN THE CORRECT GM RECORD', async () => {
      const todaysDate = new Date(TEST_DATE);
      todaysDate.setHours(0, 0, 0, 0);
      todaysDate.setDate(todaysDate.getDate() - 3);

      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gmLastDate: todaysDate.getTime(),
            gmTotalCount: 1,
            gmStreak: 1,
          },
        },
      );

      const response = await testGmMessageHandler();
      expect(response).toBe(`gm **testUser**, you have said gm **1 day in a row** 🔥 and a total of 2 times 🥳`);
    });

    it('CASE II : SHOULD RETURN THE CORRECT GM RECORD', async () => {
      const todaysDate = new Date(TEST_DATE);
      todaysDate.setHours(0, 0, 0, 0);
      todaysDate.setDate(todaysDate.getDate() - 3);

      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gmLastDate: todaysDate.getTime(),
            gmTotalCount: 2,
            gmStreak: 2,
          },
        },
      );

      const response = await testGmMessageHandler();
      expect(response).toBe(`gm **testUser**, you have said gm **1 day in a row** 🔥 and a total of 3 times 🥳`);
    });
  });
}
