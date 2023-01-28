/// -------------------------------------------------------------------------------------- #
/// ** Custom Embed Builder**
/// Builds a custom embed message for the server
/// -------------------------------------------------------------------------------------- #
import { EmbedBuilder } from 'discord.js';
import { COLORS } from './constants';

export const createBasicEmbed = (
  msg: { title: string; message: string },
  level: 'SUCCESS' | 'INFO' | 'ERROR' | 'WARNING' | 'ANNOUNCEMENT' | 'REACTION_ROLE',
) => {
  const message = new EmbedBuilder()
    .setColor(COLORS[level])
    .setTitle(msg.title)
    .setDescription(msg.message)
    .setTimestamp();

  // console.log(message);
  return message;
  // .setFooter(CONSTANTS.FOOTER, CONSTANTS.FOOTER_LOGO_URL);
};
