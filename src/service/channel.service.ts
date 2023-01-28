/// -------------------------------------------------------------------------------------- #
/// ** Channel Id Finder Service **
/// Finds the id of a channel by its name
/// -------------------------------------------------------------------------------------- #
import { Client, TextChannel } from 'discord.js';
import LoggerInstance from '../loaders/logger';

export async function getDiscordChannelIdFromChannelName(channelName: string, Client: Client) {
  try {
    const channels = Client.channels.cache;
    for (const key of channels.keys()) {
      const channel = channels.get(key);
      if (channel instanceof TextChannel) {
        if (channel.name == channelName) {
          return channel.id;
        }
      }
    }
  } catch (error) {
    LoggerInstance.error(error);
  }
}
