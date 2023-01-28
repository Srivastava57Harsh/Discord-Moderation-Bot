/// -------------------------------------------------------------------------------------- #
/// ** Deploy Commands Handler**
/// Handles the deployment of the slash commands to the Discord server
/// -------------------------------------------------------------------------------------- #
import { REST, Routes } from 'discord.js';
import whatCommand from '../commands/what.command';
import howCommand from '../commands/how.command';
import whyCommand from '../commands/why.command';
import canCommand from '../commands/can.command';
import areCommand from '../commands/are.command';
import Logger from '../loaders/logger';
import LoggerInstance from '../loaders/logger';
import guideCommand from '../commands/guide.command';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

export async function deploySlashCommands() {
  const commands = [whatCommand, howCommand, whyCommand, canCommand, areCommand, guideCommand];
  try {
    Logger.info('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    LoggerInstance.error(err);
  }
}
