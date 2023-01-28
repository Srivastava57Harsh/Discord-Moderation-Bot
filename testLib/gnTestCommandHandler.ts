/// -------------------------------------------------------------------------------------- #
/// ** GN TEST COMMAND HANDLER **
/// This file contains the test functions director for the gn command
/// -------------------------------------------------------------------------------------- #
import database from '../src/loaders/database';
import { testGnMessageHandler } from './moderationTestFunctionHandler';
import { GN_COMMAND, messageType, TEST_DATE, TEST_DB } from './testsConstants';

messageType.incomingMessage.content = GN_COMMAND;

export async function gnFirstDay() {
  describe('FIRST TIME ON FIRST DAY', () => {
    it('SHOULD RETURN THE CORRECT GN RECORD', async () => {
      const response = await testGnMessageHandler();
      expect(response).toBe(`gn **testUser**, you have said gn **1 night in a row** 🔥 and a total of 1 times 🥳`);
    });
  });
}

export async function gnSecondDay() {
  describe('SECOND CONSECUTIVE DAY', () => {
    const todaysDate = new Date(TEST_DATE);
    todaysDate.setHours(0, 0, 0, 0);
    todaysDate.setDate(todaysDate.getDate() - 1);

    it('SHOULD RETURN THE CORRECT GN RECORD', async () => {
      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gnLastDate: todaysDate.getTime(),
          },
        },
      );

      const response = await testGnMessageHandler();
      expect(response).toBe(
        `gn **testUser**, you have said gn **2 nights in a row** 🔥 and a total of 2 times 🥳` ||
          //handlin edgecase when user enters the command at 12:00 am
          `gn **testUser**, you have said gn **1 night in a row** 🔥 and a total of 2 times 🥳`,
      );
    });
  });
}

export async function gnSameDay() {
  describe('ON THE SAME DAY', () => {
    it('SHOULD RETURN THE CORRECT GN RECORD', async () => {
      const response = await testGnMessageHandler();
      expect(response).toBe(`gn **testUser**, you have said gn **2 nights in a row** 🔥 and a total of 2 times 🥳`);
    });
  });
}

export async function gnNonConsecutiveDay() {
  describe('ON A NON CONSECUTIVE DAY', () => {
    it('CASE I : SHOULD RETURN THE CORRECT GN RECORD', async () => {
      const todaysDate = new Date(TEST_DATE);
      todaysDate.setHours(0, 0, 0, 0);
      todaysDate.setDate(todaysDate.getDate() - 3);

      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gnLastDate: todaysDate.getTime(),
            gnTotalCount: 1,
            gnStreak: 1,
          },
        },
      );

      const response = await testGnMessageHandler();
      expect(response).toBe(`gn **testUser**, you have said gn **1 night in a row** 🔥 and a total of 2 times 🥳`);
    });

    it('CASE II : SHOULD RETURN THE CORRECT GN RECORD', async () => {
      const todaysDate = new Date(TEST_DATE);
      todaysDate.setHours(0, 0, 0, 0);
      todaysDate.setDate(todaysDate.getDate() - 3);

      await (await database()).collection(TEST_DB).updateOne(
        { userId: messageType.incomingUser.id },
        {
          $set: {
            gnLastDate: todaysDate.getTime(),
            gnTotalCount: 2,
            gnStreak: 2,
          },
        },
      );

      const response = await testGnMessageHandler();
      expect(response).toBe(`gn **testUser**, you have said gn **1 night in a row** 🔥 and a total of 3 times 🥳`);
    });
  });
}
