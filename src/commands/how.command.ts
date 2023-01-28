/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "how"
/// Defines the the slash command, its description, the subcommand group and subcommand for "how" statements
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const howCommand = new SlashCommandBuilder()
  .setName('how')
  .setDescription('FAQs')
  //does-hashstack
  .addSubcommandGroup(group =>
    group
      .setName('does-hashstack')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('get-price-feeds')
          .setDescription('Hashstack uses Empiric Network to get both price and computational feeds. The Price....'),
      )
      .addSubcommand(option =>
        option
          .setName('calculate-interest-rates')
          .setDescription('Hashstack uses the asset utilization ratio to calculate the APRs for both lenders and.....'),
      ),
  )
  //to-know-that-your-collateral
  .addSubcommandGroup(group =>
    group
      .setName('to-know-that-your-collateral')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('is-nearing-liquidation')
          .setDescription(
            'Hashstack will send you an in-app notification to notify you when your collateral value drops.....',
          ),
      ),
  );

export default howCommand.toJSON();
