/// -------------------------------------------------------------------------------------- #
/// ** Image Interaction Service **
/// sends an image to the user
/// -------------------------------------------------------------------------------------- #
import LoggerInstance from '../loaders/logger';
import { IMAGES } from '../utils/constants';

export async function handleImageInteraction(interaction) {
  try {
    switch (interaction.options._subcommand) {
      case 'the-fee-structure-of-platform':
        const file = IMAGES.FEE_STRUCTURE_IMAGE;
        return file;
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
