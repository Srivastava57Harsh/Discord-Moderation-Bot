/// -------------------------------------------------------------------------------------- #
/// ** !gn command handler**
/// Handles the incoming !gn command
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import { createBasicEmbed } from '../../utils/messages';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';

export async function getGnMessage(
  incomingMessage: Message,
  incomingUserId: string,
  userName: string,
  isMod: boolean,
  dbCollection: string,
  testDate?: string,
) {
  try {
    /**
     *
     * CHECK WHETHER USER IS A MOD OR NOT
     */
    if (!isMod) {
      /**
       *
       * CHECK WHETHER USER EXISTS OR NOT IN THE DATABASE
       */
      const userExists = await (await database()).collection(dbCollection).findOne({ userId: incomingUserId });
      if (!userExists) {
        let date = new Date();
        if (testDate) {
          date = new Date(testDate);
        }
        date.setHours(0, 0, 0, 0);
        await (await database()).collection(dbCollection).insertOne({
          userId: incomingUserId,
          userName: userName,
          joinedDiscord: true,
          gmTotalCount: 0,
          gnTotalCount: 1,
          gmLastDate: 'Mon Jan 01 1900 00:00:00',
          gnLastDate: date.getTime(),
          gnStreak: 1,
          gmStreak: 0,
          gmAllTimeLongestStreak: 0,
          gnAllTimeLongestStreak: 1,
          wasTimedOut: false,
        });
        const responseStatement = `gm **${userName}**, you have said gm **1 night in a row** 🔥 and a total of 1 times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
      }
      /**
       *
       * INITIALIZING PRESENT DATE IN TH REQUIRED FORMAT
       */
      const user = await (await database()).collection(dbCollection).findOne({ userId: incomingUserId });
      let date = new Date();
      if (testDate) {
        date = new Date(testDate);
      }
      date.setHours(0, 0, 0, 0);
      /**
       *
       * HANDLE WHEN USER ENTERS THE COMMAND FOR THE FIRST TIME
       */
      if (user.gnStreak < 1) {
        await (await database()).collection(dbCollection).updateOne(
          { userId: incomingUserId },
          {
            $set: {
              gnStreak: user.gnStreak + 1,
              gnTotalCount: user.gnTotalCount + 1,
              gnAllTimeLongestStreak: user.gnAllTimeLongestStreak + 1,
              gnLastDate: date.getTime(),
            },
          },
        );

        const responseStatement = `gn **${userName}**, you have said gn **1 night in a row** 🔥 and a total of ${
          user.gnTotalCount + 1
        } times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
      }
      /**
       *
       * iNITIALIZING YESTERDAY'S DATE TO CONTINUE THE STREAK
       */
      let todaysDate = new Date();
      if (testDate) {
        todaysDate = new Date(testDate);
      }
      todaysDate.setHours(0, 0, 0, 0);
      todaysDate.setDate(todaysDate.getDate() - 1);

      let sameDate = new Date();
      if (testDate) {
        sameDate = new Date(testDate);
      }
      sameDate.setHours(0, 0, 0, 0);
      /**
       *
       * CHECK WHETHER STREAK CONTINUES OR NOT
       */
      if (user.gnLastDate === todaysDate.getTime()) {
        /**
         *
         * CHECK WHETHER CURRENT STREAK CROSSES THE HIGHEST STREAK NUMBER
         */
        if (user.gnAllTimeLongestStreak === user.gnStreak) {
          await (await database()).collection(dbCollection).updateOne(
            { userId: incomingUserId },
            {
              $set: {
                gnStreak: user.gnStreak + 1,
                gnTotalCount: user.gnTotalCount + 1,
                gnLastDate: date.getTime(),
                gnAllTimeLongestStreak: user.gnAllTimeLongestStreak + 1,
              },
            },
          );
        } else {
          await (await database()).collection(dbCollection).updateOne(
            { userId: incomingUserId },
            {
              $set: {
                gnStreak: user.gnStreak + 1,
                gnTotalCount: user.gnTotalCount + 1,
                gnLastDate: date.getTime(),
              },
            },
          );
        }

        const responseStatement = `gn **${userName}**, you have said gn **${
          user.gnStreak + 1
        } nights in a row** 🔥 and a total of ${user.gnTotalCount + 1} times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
        /**
         *
         * CHECK WHETHER USER POSTS ON THE SAME DAY ITSELF
         */
      } else if (user.gnLastDate === sameDate.getTime()) {
        let night = '';
        user.gnStreak > 1 ? (night = 'nights') : (night = 'night');

        const responseStatement = `gn **${userName}**, you have said gn **${user.gnStreak} ${night} in a row** 🔥 and a total of ${user.gnTotalCount} times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
      } else {
        await (await database())
          .collection(dbCollection)
          .updateOne(
            { userId: incomingUserId },
            { $set: { gnStreak: 1, gnTotalCount: user.gnTotalCount + 1, gnLastDate: date.getTime() } },
          );
        const responseStatement = `gn **${userName}**, you have said gn **1 night in a row** 🔥 and a total of ${
          user.gnTotalCount + 1
        } times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
      }
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
