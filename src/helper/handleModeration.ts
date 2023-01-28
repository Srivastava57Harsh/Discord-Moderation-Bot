/// -------------------------------------------------------------------------------------- #
/// ** Moderation Handler **
/// checks for the content of the incoming message and takes action accordingly, makes sure that messages aren't againts the community guidelines
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import LoggerInstance from '../loaders/logger';
import { BLACKLISTED_INVITES, BLACKLISTED_LINKS, BLACKLISTED_WORDS, MENTIONS } from '../utils/constants';
import { deleteAndTimeout } from '../service/moderation.service';

export async function handleModeration(
  incomingMessage: Message,
  incomingUserId: string,
  incomingUserName: string,
  isMod: boolean,
  isAdmin: boolean,
  dbCollection: string,
  isTest?: boolean,
) {
  try {
    /**
     *
     * CHECK WHETHER USER IS A MOD OR NOT
     */
    if (!isMod && !isAdmin) {
      const moderationCommand = incomingMessage.content.split(' ')[0];
      if (
        moderationCommand === MENTIONS.EVERYONE ||
        moderationCommand === MENTIONS.HERE ||
        moderationCommand === MENTIONS.HASHFAM
      ) {
        await deleteAndTimeout(
          incomingMessage,
          incomingUserId,
          incomingUserName,
          "Don't use @everyone or @here or #fam in our server!",
          'You cannot use @everyone or @here or @hashfam in our server!',
          10,
          '10s timeout as per community rules and guidelines.',
          dbCollection,
          isTest,
        );
      }

      // Timeout for 10s and delete the message for using blacklisted commands
      for (const word of BLACKLISTED_WORDS) {
        if (incomingMessage.content.toLowerCase().includes(word)) {
          await deleteAndTimeout(
            incomingMessage,
            incomingUserId,
            incomingUserName,
            'Keep the use of Profanity out of our server!',
            'Use of blacklisted/banned words is prohibited!',
            10,
            '10s timeout as per community rules and guidelines.',
            dbCollection,
            isTest,
          );
        }
      }

      if (BLACKLISTED_INVITES.some(word => incomingMessage.content.toLowerCase().includes(word))) {
        await deleteAndTimeout(
          incomingMessage,
          incomingUserId,
          incomingUserName,
          'Kindly avoid sending any invites to our server, please!',
          'You cannot send invites to other Discord servers 💣',
          10,
          '10s timeout as per community rules and guidelines.',
          dbCollection,
          isTest,
        );
      }

      if (BLACKLISTED_LINKS.some(word => incomingMessage.content.toLowerCase().includes(word))) {
        await deleteAndTimeout(
          incomingMessage,
          incomingUserId,
          incomingUserName,
          'Kindly avoid sending any blacklisted/banned links to our server, please!',
          'You cannot send malicious/unsafe links to other Discord servers 💣',
          10,
          '10s timeout as per community rules and guidelines.',
          dbCollection,
          isTest,
        );
      }

      // Timeout fot mass pinging
      if (incomingMessage.mentions.members.size > 2) {
        await deleteAndTimeout(
          incomingMessage,
          incomingUserId,
          incomingUserName,
          'Avoid mass pinging the, please!',
          'You cannot ping more than two users at a time',
          10,
          '10s timeout as per community rules and guidelines.',
          dbCollection,
          isTest,
        );

        return;
      }
    }
  } catch (err) {
    if (!isTest) LoggerInstance.error(err);
  }
}
