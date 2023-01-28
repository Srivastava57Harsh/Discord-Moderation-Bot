/// -------------------------------------------------------------------------------------- #
/// ** Main entry point of the application **
/// Loads all the essential modules for server to start and logs the message, also handles the action and events of discord client.
/// -------------------------------------------------------------------------------------- #
import { ChannelType, Message } from 'discord.js';
import express from 'express';
import config from './config';
import { handleIncomingChannelCommand } from './controllers/incomingMessageHandler';
import { handleInteraction } from './helper/handleInteraction';
import { handleMemberJoin, handleMemberLeave } from './helper/handleMember';
import { checkForAccessByRoles } from './helper/roleAuth';
import Loaders from './loaders';
import { deploySlashCommands } from './loaders/deployCommands';
import Logger from './loaders/logger';
import { incomingMessageSchema } from './models/incommingMessages';
import { getDiscordBot } from './utils/discord';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });

  const client = await getDiscordBot();

  await deploySlashCommands();

  client.on('ready', () => {
    if (client) Logger.info(`✔️  Logged in as ${client.user!.tag}!`);
  });

  client.on('messageCreate', async (message: Message) => {
    if (!message.author.bot) {
      const messageType: incomingMessageSchema = {
        channelType: message.channel.type,
        incomingUser: {
          username: message.author.username,
          discriminator: message.author.discriminator,
          id: message.author.id,
          isMod: await checkForAccessByRoles(message.member, [`${process.env.OPERATOR_ROLE_ID}`]),
          isAdmin: await checkForAccessByRoles(message.member, [`${process.env.ADMIN_ROLE_ID}`]),
        },
      };

      switch (message.channel.type) {
        case ChannelType.GuildText: {
          handleIncomingChannelCommand(message, messageType, process.env.PRODUCTION_DB_COLLECTION, client);
          break;
        }

        case ChannelType.DM: {
          Logger.info('No function supported yet');
          break;
        }

        default: {
          console.log(message.channel.type);
          Logger.info('user-error', 'ChannelNotSupported', 'Channel Not Supported');
        }
      }
    }
  });

  client.on('guildMemberAdd', member => {
    if (!member.user.bot) {
      handleMemberJoin(member, client);
    }
  });

  client.on('guildMemberRemove', member => {
    handleMemberLeave(member);
  });

  client.on('interactionCreate', async interaction => {
    // console.log(interaction);
    await handleInteraction(interaction);
  });
}

startServer();
