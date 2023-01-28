/// -------------------------------------------------------------------------------------- #
/// ** LEADERBOARD MICROSERVICE **
/// Fetches the leaderboard data from the database and returns the leaderboard embed, also configures date for the leaderboard
/// -------------------------------------------------------------------------------------- #
import {
  DMChannel,
  NewsChannel,
  PartialDMChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
  TextChannel,
  VoiceChannel,
} from 'discord.js';
import LoggerInstance from '../../loaders/logger';
import { DAYS, INFO } from '../../utils/constants';
import { createBasicEmbed } from '../../utils/messages';

export async function leaderboardMicroservice(
  db: any[],
  days: number,
  todaysDate: Date,
  startDate: Date,
  heading: string,
  channel:
    | DMChannel
    | PartialDMChannel
    | NewsChannel
    | TextChannel
    | PrivateThreadChannel
    | PublicThreadChannel<boolean>
    | VoiceChannel
    | TextChannel,
) {
  try {
    const topTenArray = db.map((item, index) => {
      if (index < 10) {
        if (heading === 'gn') {
          if (days != 0) {
            if (item.gnLastDate <= todaysDate.getTime() && item.gnLastDate >= startDate.getTime()) {
              return `**${index + 1}. ${item.userName}** - ${item.gnTotalCount} times`;
            }
          } else {
            return `**${index + 1}. ${item.userName}** - ${item.gnTotalCount} times`;
          }
        }
        if (heading === 'gm') {
          if (days != 0) {
            if (item.gmLastDate <= todaysDate.getTime() && item.gmLastDate >= startDate.getTime()) {
              return `**${index + 1}. ${item.userName}** - ${item.gmTotalCount} times`;
            }
          } else {
            return `**${index + 1}. ${item.userName}** - ${item.gmTotalCount} times`;
          }
        }
      }
    });

    let title = '';
    let topTenList = '';
    topTenArray.map((item, index) => {
      topTenList += `**${index}. ${item}\n**`;
    });
    if (days === DAYS.week) title = 'Last 7 Days';
    if (days === DAYS.month) title = 'Last 30 Days';
    if (days === DAYS.allTime) title = 'All Time';
    channel.send({ embeds: [createBasicEmbed(INFO.DISPLAY_LEADERBOARD(heading, title, topTenArray), 'SUCCESS')] });
    return topTenArray;
  } catch (err) {
    LoggerInstance.error(err);
  }
}

export async function leaderboardDateConfig(days: number, testDate?: string) {
  let todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  let startDate = new Date();

  if (testDate) {
    todaysDate = new Date(testDate);
  }

  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(todaysDate.getDate() - days);

  return { todaysDate, startDate };
}
