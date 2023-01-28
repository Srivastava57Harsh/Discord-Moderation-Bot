/// -------------------------------------------------------------------------------------- #
/// **Interaction Message Handler
/// Handles incoming interactions from the discord server
/// -------------------------------------------------------------------------------------- #
import { handleImageInteraction } from '../service/imageInteraction.service';
import { handleTextInteraction } from '../service/textInteraction.service';
import Logger from '../loaders/logger';
import { GUIDE_COMMANDS } from '../utils/constants';
import { handleImageWithTextInteraction } from '../service/imageWithTextInteraction.service';

export async function handleInteraction(interaction) {
  Logger.info(
    `interaction slash command : ${interaction.commandName} ${interaction.options._group} ${interaction.options._subcommand}`,
  );

  if (!interaction.isCommand()) return;

  const imageReply = await handleImageInteraction(interaction);
  console.log(imageReply);
  if (imageReply) {
    interaction.reply({
      files: [imageReply],
      ephemeral: true,
    });
  } else {
    if (interaction.commandName === 'guide' && GUIDE_COMMANDS.includes(interaction.options._subcommand)) {
      await handleImageWithTextInteraction(interaction);
    } else {
      const response = await handleTextInteraction(interaction);
      interaction.reply({
        content: response,
        ephemeral: true,
      });
    }
  }
}
