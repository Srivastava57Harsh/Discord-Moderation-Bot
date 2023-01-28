/// -------------------------------------------------------------------------------------- #
/// ** MODERATION SERVICE **
/// Handles the moderation of the server. Timesout user and delets the message.
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import database from '../loaders/database';
import { incomingMessageSchema } from '../models/incommingMessages';
import { INFO } from '../utils/constants';
import { createBasicEmbed } from '../utils/messages';
import { timeoutUser } from './member.service';

export async function wasTimedOut(
  incomingUserId: string,
  incommingUsername: string,
  dbCollection: string,
  testDate?: string,
) {
  const userExists = await (await database()).collection(dbCollection).findOne({ userId: incomingUserId });
  if (!userExists) {
    let date = new Date();
    if (testDate) {
      date = new Date(testDate);
    }
    date.setHours(0, 0, 0, 0);
    await (await database()).collection(dbCollection).insertOne({
      userId: incomingUserId,
      userName: incommingUsername,
      joinedDiscord: true,
      gmTotalCount: 0,
      gnTotalCount: 0,
      gmLastDate: 'Mon Jan 01 1900 00:00:00',
      gnLastDate: 'Mon Jan 01 1900 00:00:00',
      gnStreak: 0,
      gmStreak: 0,
      gmAllTimeLongestStreak: 0,
      gnAllTimeLongestStreak: 1,
      wasTimedOut: false,
    });
    return false;
  }

  const user = await (await database()).collection(dbCollection).findOne({ userId: incomingUserId });
  if (user.wasTimedOut) {
    return true;
  }
  return false;
}

export async function deleteAndTimeout(
  incomingMessage: Message,
  incomingUserId: string,
  incomingUserName: string,
  dmMessage: string,
  channelMessage: string,
  time: number,
  timeoutMessage: string,
  dbCollection: string,
  isTest?: boolean,
) {
  if (!isTest) {
    await incomingMessage.delete();
    await incomingMessage.author.send({
      embeds: [createBasicEmbed(INFO.WARN(incomingUserName, `${dmMessage}`), 'WARNING')],
    });
    await incomingMessage.channel
      .send({
        embeds: [createBasicEmbed(INFO.WARN(incomingUserName, `${channelMessage}`), 'WARNING')],
      })
      .then(message => {
        setTimeout(() => {
          message.delete();
        }, 5000);
      });

    const userExists = await (await database()).collection(dbCollection).findOne({ userId: incomingUserId });
    if (!userExists) {
      return incomingMessage.channel.send(
        `${incomingUserName} ${createBasicEmbed(
          {
            title: `User Not Found!`,
            message: `${incomingUserName} could not be found be found in the database! Try rejoing the server. `,
          },
          'ERROR',
        )}`,
      );
    }
    await (await database())
      .collection(dbCollection)
      .updateOne({ userId: incomingUserId }, { $set: { wasTimedOut: true } });

    await timeoutUser(incomingMessage, incomingUserName, time, `${timeoutMessage}`);
  }
  await (await database())
    .collection(dbCollection)
    .updateOne({ userId: incomingUserId }, { $set: { wasTimedOut: true } });
}
