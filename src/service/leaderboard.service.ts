/// -------------------------------------------------------------------------------------- #
/// ** Leaderboard Service **
/// Sends a leaderboard to the user
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import database from '../loaders/database';
import LoggerInstance from '../loaders/logger';
import { leaderboardDateConfig, leaderboardMicroservice } from './microService/leaderboard.microservice';

export async function leaderBoardService(
  incomingMessage: Message,
  days: number,
  dbCollection: string,
  type: string,
  testDate?: string,
) {
  try {
    const channel = incomingMessage.channel;
    if (!channel) return;
    let db = await (await database()).collection(dbCollection).find({}).sort({ gmTotalCount: -1 }).toArray();
    if (type === 'gn') {
      db = await (await database()).collection(dbCollection).find({}).sort({ gnTotalCount: -1 }).toArray();
    }

    let dateObject = await leaderboardDateConfig(days);
    if (testDate) dateObject = await leaderboardDateConfig(days, testDate);

    const result = await leaderboardMicroservice(db, days, dateObject.todaysDate, dateObject.startDate, type, channel);
    return result;
  } catch (err) {
    LoggerInstance.error(err);
  }
}
