/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "are"**
/// Defines the the slash command, its description, the subcommand group and subcommand for "are" statements
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const areCommand = new SlashCommandBuilder()
  .setName('are')
  .setDescription('FAQs')
  .addSubcommandGroup(group =>
    group
      .setName('we')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('audited')
          .setDescription(
            'Yes, Hashstack has been audited by Certik, one of the most reliable and trusted auditing.....',
          ),
      ),
  );

export default areCommand.toJSON();
