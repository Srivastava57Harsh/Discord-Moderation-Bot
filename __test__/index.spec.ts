/// -------------------------------------------------------------------------------------- #
/// ** JEST TESTS FILE FOR THE BOT  ** ///
/// ** THIS FILE CONTAINS ALL THE TESTS FOR THE BOT  ** ///
/// -------------------------------------------------------------------------------------- #
import { updateUserJoinOrLeave } from '../src/service/member.service';
import database, { closeDB } from '../src/loaders/database';
import { captchaVerification } from '../src/service/captcha.service';
import { leaderBoardService } from '../src/service/leaderboard.service';
import {
  TEST_DB,
  TEST_ID,
  member,
  messageType,
  message,
  BLACKLISTED_WORDS,
  BLACKLISTED_TAGS,
  BLACKLISTED_LINKS,
  BLACKLISTED_INVITES,
  TEST_DATE,
  GM_ALL_TIME_LEADERBOARD,
  GM_MONTHLY_LEADERBOARD,
  GM_WEEKLY_LEADERBOARD,
  GN_ALL_TIME_LEADERBOARD,
  GN_MONTHLY_LEADERBOARD,
  GN_WEEKLY_LEADERBOARD,
} from '../testLib/testsConstants';

import { moderationTestFunctionHandler } from '../testLib/moderationTestFunctionHandler';
import { gmFirstDay, gmNonConsecutiveDay, gmSameDay, gmSecondDay } from '../testLib/gmTestCommandHandler';
import { gnFirstDay, gnNonConsecutiveDay, gnSameDay, gnSecondDay } from '../testLib/gnTestCommandHandler';
import { insertData } from '../testLib/databaseTest';
import { wasTimedOut } from '../src/service/moderation.service';

describe('INITIALISE DB', () => {
  it('SHOULD ADD DATA INTO DB FOR TEST', async () => {
    await insertData();
    const databaseData = await (await database()).collection(TEST_DB).find({}).toArray();
    expect(databaseData.length).toBe(4);
  });
});

describe('JOIN MEMBER TEST', () => {
  it('SHOULD SEND THE MESSAGE AND UPDATE THE DATABASE', async () => {
    await updateUserJoinOrLeave(member.id, member.displayName, 'join', TEST_DB);
    const postResponse = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
    expect(postResponse?.joinedDiscord).toBe(true);
  });
});

describe('VERIFY TIMEOUT STATUS', () => {
  it('SHOULD RETURN TRUE IF USER IS TIMED OUT', async () => {
    const response = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
    expect(response?.wasTimedOut).toBe(true);
  });
});

describe('CAPTCHA VALIDATION TEST', () => {
  it('SHOULD VALIDATE USER', async () => {
    await captchaVerification(message, messageType.incomingUser.id, TEST_DB, true);
  });
  it('RETURN FALSE "wasTimedOut" STATUS', async () => {
    const response = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
    expect(response?.wasTimedOut).toBe(false);
  });
});

describe('MODERATION', () => {
  jest.setTimeout(15000)
  moderationTestFunctionHandler(BLACKLISTED_TAGS, 'BLACKLISTED TAGS');
  moderationTestFunctionHandler(BLACKLISTED_WORDS, 'BLACKLISTED WORDS');
  moderationTestFunctionHandler(BLACKLISTED_LINKS, 'BLACKLISTED LINKS');
  moderationTestFunctionHandler(BLACKLISTED_INVITES, 'BLACKLISTED INVITES');
});

describe('INCOMING MESSAGE TEST', () => {
  describe('USER IS NOT REGISTERED', () => {
    it('SHOULD RETURN FALSE AND UPDATE DATABASE', async () => {
      await updateUserJoinOrLeave(member.id, member.displayName, 'leave', TEST_DB);
      const preResponse = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
      expect(preResponse).toBe(null);
      const result = await wasTimedOut(
        messageType.incomingUser.id,
        messageType.incomingUser.username,
        TEST_DB,
        TEST_DATE,
      );
      expect(result).toBe(false);
      const postResponse = await (await database()).collection(TEST_DB).findOne({ userId: TEST_ID });
      expect(postResponse?.joinedDiscord).toBe(true);
    });
  });
  describe('USER ENTERS !gm COMMAND', () => {
    gmFirstDay();
    gmSecondDay();
    gmSameDay();
    gmNonConsecutiveDay();
  });

  describe('USER ENTERS !gn COMMAND', () => {
    gnFirstDay();
    gnSecondDay();
    gnSameDay();
    gnNonConsecutiveDay();
  });

  describe('USER ENTERS !gmLeaderborad COMMAND', () => {
    const todaysDate = new Date(TEST_DATE);
    todaysDate.setHours(0, 0, 0, 0);
    describe('FOR ALL TIME', () => {
      messageType.incomingMessage.content = '!gmLeaderboard -a';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 0, TEST_DB, 'gm', TEST_DATE);
        expect(response).toStrictEqual(GM_ALL_TIME_LEADERBOARD);
      });
    });
    describe('FOR LAST 30 DAYS', () => {
      messageType.incomingMessage.content = '!gmLeaderboard -m';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 30, TEST_DB, 'gm', TEST_DATE);
        expect(response).toStrictEqual(GM_MONTHLY_LEADERBOARD);
      });
    });
    describe('FOR LAST 7 DAYS', () => {
      messageType.incomingMessage.content = '!gmLeaderboard -w';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 7, TEST_DB, 'gm', TEST_DATE);
        expect(response).toStrictEqual(GM_WEEKLY_LEADERBOARD);
      });
    });
  });

  describe('USER ENTERS !gnLeaderborad COMMAND', () => {
    const todaysDate = new Date(TEST_DATE);
    todaysDate.setHours(0, 0, 0, 0);
    describe('FOR ALL TIME', () => {
      messageType.incomingMessage.content = '!gnLeaderboard -a';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 0, TEST_DB, 'gn', TEST_DATE);
        expect(response).toStrictEqual(GN_ALL_TIME_LEADERBOARD);
      });
    });
    describe('FOR LAST 30 DAYS', () => {
      messageType.incomingMessage.content = '!gnLeaderboard -m';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 30, TEST_DB, 'gn', TEST_DATE);
        expect(response).toStrictEqual(GN_MONTHLY_LEADERBOARD);
      });
    });
    describe('FOR LAST 7 DAYS', () => {
      messageType.incomingMessage.content = '!gnLeaderboard -w';
      it('SHOULD RETURN THE ALL TIME GM LEADERBOARD', async () => {
        const response = await leaderBoardService(message, 7, TEST_DB, 'gn', TEST_DATE);
        expect(response).toStrictEqual(GN_WEEKLY_LEADERBOARD);
      });
    });
  });
});

describe('LEAVE MEMBER TEST', () => {
  it('SHOULD SEND THE MESSAGE AND UPDATE THE DATABASE', async () => {
    await updateUserJoinOrLeave(member.id, member.displayName, 'leave', TEST_DB);
    const userExists = await (await database()).collection(TEST_DB).findOne({ userId: member.id });
    expect(userExists).toBe(null);
    await (await database()).collection(TEST_DB).deleteMany({});
    await closeDB();
  });
});
