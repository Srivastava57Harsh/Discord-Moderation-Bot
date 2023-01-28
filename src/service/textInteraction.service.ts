/// -------------------------------------------------------------------------------------- #
/// ** Text Interaction Service **
/// Handles the slash commands interactions for statements starting from "are", "what", "how", "why" and "can"
/// -------------------------------------------------------------------------------------- #
import LoggerInstance from '../loaders/logger';
import {
  HOW_DOES_COMMANDS,
  HOW_DOES_COMMANDS_ANSWERS,
  WHAT_ARE_COMMANDS,
  WHAT_ARE_COMMANDS_ANSWERS,
  WHAT_IS_COMMANDS,
  WHAT_IS_COMMANDS_ANSWERS,
} from '../utils/constants';

export async function handleTextInteraction(interaction) {
  //   console.log(interaction.commandName);

  try {
    switch (interaction.commandName) {
      case 'are':
        const content =
          'Yes, Hashstack has been audited by Certik, one of the most reliable and trusted auditing firms in the blockchain space. The audit report can be found here: https://www.certik.org/projects/hashstack';
        return content;

      case 'what':
        switch (interaction.options._group) {
          case 'is':
            if (WHAT_IS_COMMANDS.includes(interaction.options._subcommand)) {
              const index = WHAT_IS_COMMANDS.indexOf(interaction.options._subcommand);
              const content = WHAT_IS_COMMANDS_ANSWERS[index];
              return content;
            }
            break;

          case 'assets-tokens':
            const content =
              'Hashstack’s primary market will revolve around WBTC, USDT, USDC, BNB, and HASH. As the protocol evolves, new assets will be added soon.';
            return content;

          case 'are':
            if (WHAT_ARE_COMMANDS.includes(interaction.options._subcommand)) {
              const index = WHAT_ARE_COMMANDS.indexOf(interaction.options._subcommand);
              const content = WHAT_ARE_COMMANDS_ANSWERS[index];
              return content;
            }
            break;

          default:
            break;
        }
        break;

      case 'how':
        switch (interaction.options._group) {
          case 'does-hashstack':
            if (HOW_DOES_COMMANDS.includes(interaction.options._subcommand)) {
              const index = HOW_DOES_COMMANDS.indexOf(interaction.options._subcommand);
              const content = HOW_DOES_COMMANDS_ANSWERS[index];
              return content;
            }
            break;

          case 'to-know-that-your-collateral':
            const content =
              'Hashstack will send you an in-app notification to notify you when your collateral value drops below a certain threshold. You can add more collateral to your loan to prevent it from entering the distressed loan category.';
            return content;

          default:
            break;
        }
        break;

      case 'why':
        const answer =
          'Hashstack allows you to borrow up to 3 times the collateral amount, which is not offered by any other lending platforms.';
        return answer;

      case 'can':
        const reply =
          'Yes, you can withdraw up to 70% of your collateral amount from the loan amount. For instance, if you borrow $1000 of ETH by depositing $334 USDT, you can withdraw up to 70% of $334 (i.e., $234) into your wallet.';
        return reply;
    }
  } catch (err) {
    LoggerInstance.error(err);
  }
}
