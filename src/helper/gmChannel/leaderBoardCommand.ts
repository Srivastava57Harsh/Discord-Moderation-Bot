/// -------------------------------------------------------------------------------------- #
/// ** Leaderboard command handler**
/// Differentiate between the different leaderboard commands, calls the leaderboard service accordingly and returns the data
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import { COMMANDS, DAYS } from '../../utils/constants';
import LoggerInstance from '../../loaders/logger';
import { leaderBoardService } from '../../service/leaderboard.service';

export async function getGmLeaderboardMessage(incomingMessage: Message, dbCollection: string) {
  try {
    const suffixCommand = incomingMessage.content.split(' ')[1];
    switch (suffixCommand) {
      case COMMANDS.allTimeLeaderBoardSuffix: {
        const data = await leaderBoardService(incomingMessage, DAYS.allTime, dbCollection, 'gm');
        return data;
      }
      case COMMANDS.monthlyLeaderBoardSuffix: {
        const data = leaderBoardService(incomingMessage, DAYS.month, dbCollection, 'gm');
        return data;
      }
      case COMMANDS.weeklyLeaderBoardSuffix: {
        const data = leaderBoardService(incomingMessage, DAYS.week, dbCollection, 'gm');
        return data;
      }
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}

export async function getGnLeaderboardMessage(incomingMessage: Message, dbCollection: string) {
  try {
    const suffixCommand = incomingMessage.content.split(' ')[1];
    switch (suffixCommand) {
      case COMMANDS.allTimeLeaderBoardSuffix: {
        const data = leaderBoardService(incomingMessage, DAYS.allTime, dbCollection, 'gn');
        return data;
      }
      case COMMANDS.monthlyLeaderBoardSuffix: {
        const data = leaderBoardService(incomingMessage, DAYS.month, dbCollection, 'gn');
        return data;
      }
      case COMMANDS.weeklyLeaderBoardSuffix: {
        const data = leaderBoardService(incomingMessage, DAYS.week, dbCollection, 'gn');
        return data;
      }
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
