/// -------------------------------------------------------------------------------------- #
/// ** !gm command handler**
/// Handles the incoming !gm command
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import { createBasicEmbed } from '../../utils/messages';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';

export async function getGmMessage(
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
          gmTotalCount: 1,
          gnTotalCount: 0,
          gmLastDate: date.getTime(),
          gnLastDate: 'Mon Jan 01 1900 00:00:00',
          gnStreak: 0,
          gmStreak: 1,
          gmAllTimeLongestStreak: 1,
          gnAllTimeLongestStreak: 0,
          wasTimedOut: false,
        });
        const responseStatement = `gm **${userName}**, you have said gm **1 day in a row** 🔥 and a total of 1 times 🥳`;
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
      if (user.gmStreak < 1) {
        await (await database()).collection(dbCollection).updateOne(
          { userId: incomingUserId },
          {
            $set: {
              gmStreak: user.gmStreak + 1,
              gmTotalCount: user.gmTotalCount + 1,
              gmAllTimeLongestStreak: user.gmAllTimeLongestStreak + 1,
              gmLastDate: date.getTime(),
            },
          },
        );

        const responseStatement = `gm **${userName}**, you have said gm **1 day in a row** 🔥 and a total of ${
          user.gmTotalCount + 1
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
      if (user.gmLastDate === todaysDate.getTime()) {
        /**
         *
         * CHECK WHETHER CURRENT STREAK CROSSES THE HIGHEST STREAK NUMBER
         */
        if (user.gmAllTimeLongestStreak === user.gmStreak) {
          await (await database()).collection(dbCollection).updateOne(
            { userId: incomingUserId },
            {
              $set: {
                gmStreak: user.gmStreak + 1,
                gmTotalCount: user.gmTotalCount + 1,
                gmLastDate: date.getTime(),
                gmAllTimeLongestStreak: user.gmAllTimeLongestStreak + 1,
              },
            },
          );
        } else {
          await (await database()).collection(dbCollection).updateOne(
            { userId: incomingUserId },
            {
              $set: {
                gmStreak: user.gmStreak + 1,
                gmTotalCount: user.gmTotalCount + 1,
                gmLastDate: date.getTime(),
              },
            },
          );
        }

        const responseStatement = `gm **${userName}**, you have said gm **${
          user.gmStreak + 1
        } days in a row** 🔥 and a total of ${user.gmTotalCount + 1} times 🥳`;

        await incomingMessage.channel.send(responseStatement);

        return responseStatement;
        /**
         *
         * CHECK WHETHER USER POSTS ON THE SAME DAY ITSELF
         */
      } else if (user.gmLastDate === sameDate.getTime()) {
        let day = '';
        user.gmStreak > 1 ? (day = 'days') : (day = 'day');

        const responseStatement = `gm **${userName}**, you have said gm **${user.gmStreak} ${day} in a row** 🔥 and a total of ${user.gmTotalCount} times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
        //
      } else {
        await (await database())
          .collection(dbCollection)
          .updateOne(
            { userId: incomingUserId },
            { $set: { gmStreak: 1, gmTotalCount: user.gmTotalCount + 1, gmLastDate: date.getTime() } },
          );

        const responseStatement = `gm **${userName}**, you have said gm **1 day in a row** 🔥 and a total of ${
          user.gmTotalCount + 1
        } times 🥳`;
        await incomingMessage.channel.send(responseStatement);
        return responseStatement;
      }
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
