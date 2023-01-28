/// -------------------------------------------------------------------------------------- #
/// ** Show commands handler  **
/// returns the list of commands
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';
import LoggerInstance from '../../loaders/logger';
import { COMMANDS_LIST, INFO } from '../../utils/constants';
import { createBasicEmbed } from '../../utils/messages';

export async function showCommandsList(incomingMessage: Message) {
  try {
    incomingMessage.channel.send({ embeds: [createBasicEmbed(INFO.COMMANDS_LIST(COMMANDS_LIST), 'INFO')] });
  } catch (err) {
    LoggerInstance.error(err);
  }
}
