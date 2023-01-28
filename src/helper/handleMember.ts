/// -------------------------------------------------------------------------------------- #
/// ** Member Join and Leave Handler **
/// Handles member join and leave events
/// -------------------------------------------------------------------------------------- #
import { Client, GuildMember, PartialGuildMember, TextChannel } from 'discord.js';
import { createBasicEmbed } from '../utils/messages';
import Logger from '../loaders/logger';
import { INFO } from '../utils/constants';
import { updateUserJoinOrLeave } from '../service/member.service';
import LoggerInstance from '../loaders/logger';
import { getDiscordChannelIdFromChannelName } from '../service/channel.service';

export async function handleMemberJoin(member: GuildMember, client: Client, isTest?: boolean) {
  try {
    const channelId = await getDiscordChannelIdFromChannelName(process.env.LOGGER_CHANNEL_ID, client);
    const channel = member.guild.channels.cache.find((ch: any) => ch.id === channelId) as TextChannel;
    if (!channel) {
      const data = -1;
      return data;
    }
    channel.send({ embeds: [createBasicEmbed(INFO.MEMBER_JOIN(member as GuildMember), 'SUCCESS')] });
    member.send({ embeds: [createBasicEmbed(INFO.MEMBER_JOIN_DM(member as GuildMember), 'SUCCESS')] });
    updateUserJoinOrLeave(member.id, member.displayName, 'join', process.env.PRODUCTION_DB_COLLECTION);
    member
      .timeout(30 * 60 * 1000, '30 mins timeout as per community rules and guidelines.')
      .then(console.log)
      .catch(console.error);
  } catch (err) {
    Logger.info('error', 'InternalError', err);
  }
}

export function handleMemberLeave(member: PartialGuildMember | GuildMember) {
  try {
    updateUserJoinOrLeave(member.id, member.displayName, 'leave', process.env.PRODUCTION_DB_COLLECTION);
  } catch (err) {
    LoggerInstance.error(err);
  }
}
