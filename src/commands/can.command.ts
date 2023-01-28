/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "can"
/// Defines the the slash command, its description, the subcommand group and subcommand for "can" statements
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const canCommand = new SlashCommandBuilder()
  .setName('can')
  .setDescription('FAQs')
  .addSubcommandGroup(group =>
    group
      .setName('we-withdraw')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('the-loan-amount')
          .setDescription(
            'Yes, you can withdraw up to 70% of your collateral amount from the loan amount. For instance....',
          ),
      ),
  );

export default canCommand.toJSON();
