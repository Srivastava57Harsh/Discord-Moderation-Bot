/// -------------------------------------------------------------------------------------- #
/// ** Image with Text Interaction Service **
/// sends an image with text to the user
/// -------------------------------------------------------------------------------------- #
import LoggerInstance from '../loaders/logger';
import { GUIDE_COMMANDS, GUIDE_COMMANDS_ANSWERS, IMAGES, VIDEOS } from '../utils/constants';

export async function handleImageWithTextInteraction(interaction) {
  try {
    let content = 'Oops, Seems like I am not able to fetch the appropriate answer! Give me a moment to fix it.';
    let image1 = 'NULL';
    let image2 = 'NULL';
    let index = 0;
    if (GUIDE_COMMANDS.includes(interaction.options._subcommand)) {
      switch (interaction.options._subcommand) {
        case 'swap-the-loan':
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          image1 = IMAGES.SWAP_LOAN_IMAGE;
          break;
        case 'get-testnet-tokens':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
        case 'lend-my-assets':
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          image1 = IMAGES.LEND_ASSETS_IMAGE_1;
          image2 = IMAGES.LEND_ASSETS_IMAGE_2;
          break;
        case 'connect-my-wallet':
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          image1 = IMAGES.CONNECT_WALLET_IMAGE;
          break;
        case 'add-more-funds-to-active-deposit':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
        case 'withdraw-my-deposits':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
        case 'borrow-funds':
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          image1 = IMAGES.BORROW_IMAGE_1;
          image2 = IMAGES.BORROW_IMAGE_2;
          break;
        //   console.log(image);
        case 'deposit-additional-collateral':
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          image1 = IMAGES.DEPOSIT_COLLATERAL_IMAGE;
          break;
        case 'repay-my-loan':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
        case 'withdraw-my-collateral':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
        case 'withdraw-loan-to-my-wallet':
          image1 = 'NULL';
          image2 = 'NULL';
          index = GUIDE_COMMANDS.indexOf(interaction.options._subcommand);
          content = GUIDE_COMMANDS_ANSWERS[index];
          break;
      }
      if (image1 != 'NULL' && image2 != 'NULL') {
        interaction.reply({
          content: content,
          files: [image1, image2],
          ephemeral: true,
        });
      } else if (image1 != 'NULL' && image2 == 'NULL') {
        interaction.reply({
          content: content,
          files: [image1],
          ephemeral: true,
        });
      } else if (image1 == 'NULL' && image2 != 'NULL') {
        interaction.reply({
          content: content,
          files: [image2],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: content,
          ephemeral: true,
        });
      }
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
