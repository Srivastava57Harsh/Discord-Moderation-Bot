/// -------------------------------------------------------------------------------------- #
/// ** INCOMING MESSAGES SCHEMA  ** ///
/// -------------------------------------------------------------------------------------- #
import { ChannelType } from 'discord.js';

export interface incomingMessageSchema {
  //incoming user properties
  incomingUser: {
    isMod: boolean;
    isAdmin: boolean;
    username: string;
    discriminator: string;
    id: string;
  };
  //channel types
  channelType:
    | ChannelType.GuildText
    | ChannelType.DM
    | ChannelType.GuildVoice
    | ChannelType.GuildAnnouncement
    | ChannelType.AnnouncementThread
    | ChannelType.PublicThread
    | ChannelType.PrivateThread;
}
