/// -------------------------------------------------------------------------------------- #
/// ** Incoming Message Handler
/// Function to handle incoming messages from the discord server
/// -------------------------------------------------------------------------------------- #

import { Client, Message } from 'discord.js';
import { getGmMessage } from '../helper/gmChannel/gmCommand';
import { getGnMessage } from '../helper/gmChannel/gnCommand';
import { getGmLeaderboardMessage, getGnLeaderboardMessage } from '../helper/gmChannel/leaderBoardCommand';
import { handleModeration } from '../helper/handleModeration';
import { incomingMessageSchema } from '../models/incommingMessages';
import { COMMANDS, INFO } from '../utils/constants';
import { wasTimedOut } from '../service/moderation.service';
import { captchaVerification } from '../service/captcha.service';
import { showCommandsList } from '../helper/gmChannel/showCommands';
import { getDiscordChannelIdFromChannelName } from '../service/channel.service';
import LoggerInstance from '../loaders/logger';
import { createBasicEmbed } from '../utils/messages';

export async function handleIncomingChannelCommand(
  incomingMessage: Message,
  messageType: incomingMessageSchema,
  dbCollection: string,
  client: Client,
) {
  try {
    const response = await wasTimedOut(messageType.incomingUser.id, messageType.incomingUser.username, dbCollection);

    if (response) {
      incomingMessage.delete();
      await captchaVerification(incomingMessage, messageType.incomingUser.id, dbCollection);
    }

    await handleModeration(
      incomingMessage,
      messageType.incomingUser.id,
      messageType.incomingUser.username,
      messageType.incomingUser.isMod,
      messageType.incomingUser.isAdmin,
      dbCollection,
    );
    const messageCommand = incomingMessage.content.split(' ')[0];
    const channelId = await getDiscordChannelIdFromChannelName(process.env.GM_CHANNEL_ID, client);

    if (incomingMessage.channel.id === channelId) {
      switch (messageCommand) {
        case COMMANDS.gm: {
          getGmMessage(
            incomingMessage,
            messageType.incomingUser.id,
            messageType.incomingUser.username,
            messageType.incomingUser.isMod,
            dbCollection,
          );
          break;
        }
        case COMMANDS.gn: {
          getGnMessage(
            incomingMessage,
            messageType.incomingUser.id,
            messageType.incomingUser.username,
            messageType.incomingUser.isMod,
            dbCollection,
          );
          break;
        }
        case COMMANDS.gmLeaderBoard: {
          getGmLeaderboardMessage(incomingMessage, dbCollection);

          break;
        }
        case COMMANDS.gnLeaderBoard: {
          getGnLeaderboardMessage(incomingMessage, dbCollection);

          break;
        }
      }
    }

    if (incomingMessage.channel.id != channelId) {
      if (
        messageCommand === COMMANDS.gm ||
        messageCommand === COMMANDS.gn ||
        messageCommand === COMMANDS.gmLeaderBoard ||
        messageCommand === COMMANDS.gnLeaderBoard ||
        messageCommand === 'gm' ||
        messageCommand === 'gn'
      ) {
        try {
          incomingMessage.delete();
          incomingMessage.channel
            .send({ embeds: [createBasicEmbed(INFO.WRONG_CHANNEL_COMMAND(), 'INFO')] })
            .then(message => {
              setTimeout(() => {
                message.delete();
              }, 5000);
            });
        } catch (err) {
          LoggerInstance.error(err);
        }
      }
    }

    if (messageCommand === COMMANDS.showCommandsList) {
      showCommandsList(incomingMessage);
    }
  } catch (err) {}
}
