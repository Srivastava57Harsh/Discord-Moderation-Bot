/// -------------------------------------------------------------------------------------- #
/// ** MEMBER SERVICE **
/// Handles the join and leave events of the member in the server.
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import Logger from '../loaders/logger';
import { eventUserSchema } from '../models/events';
import database from '../loaders/database';

export const updateUserJoinOrLeave = async (
  memberId: string,
  memberDisplayName: string,
  joinOrLeave: 'join' | 'leave',
  dbCollection: string,
) => {
  try {
    if (joinOrLeave === 'join') {
      const db = (await database()).collection<eventUserSchema>(dbCollection);
      const user = {
        userId: memberId,
        userName: memberDisplayName,
        joinedDiscord: true,
        gmTotalCount: 0,
        gnTotalCount: 0,
        gmLastDate: 'Mon Jan 01 1900 00:00:00',
        gnLastDate: 'Mon Jan 01 1900 00:00:00',
        gnStreak: 0,
        gmStreak: 0,
        gmAllTimeLongestStreak: 0,
        gnAllTimeLongestStreak: 0,
        wasTimedOut: true,
      };
      await db.insertOne(user);
      // console.log(resp);
      Logger.info(`✔️  New member joined the server, data inserted in database.`);
      return;
    } else {
      const db = (await database()).collection<eventUserSchema>(dbCollection);
      await db.deleteOne({ userId: memberId });
    }
  } catch (err) {
    Logger.info('❌  internal-error', 'Event MongoDB Connection Error', err);
  }
};

export const timeoutUser = async (incomingMessage: Message, userName: string, seconds: number, message: string) => {
  await incomingMessage.member
    .timeout(seconds * 1000, `${seconds} ${message}`)
    .then(() => {
      Logger.info(`${userName} timed out as per community rules and guidelines.`);
    })
    .catch(console.error);
};
