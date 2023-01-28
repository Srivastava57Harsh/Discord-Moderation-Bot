/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "why"
/// Defines the the slash command, its description, the subcommand group and subcommand for "why" statements
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const whyCommand = new SlashCommandBuilder()
  .setName('why')
  .setDescription('FAQs')
  .addSubcommandGroup(group =>
    group
      .setName('prefer-hashstack-over')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('other-lending-platforms')
          .setDescription(
            'Hashstack allows you to borrow up to 3 times the collateral amount, which is not offered by.....',
          ),
      ),
  );

export default whyCommand.toJSON();
