/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "guide"
/// Defines the the slash command, its description, the subcommand group and subcommand for "guide" statements
/// Mainly for setting up the tstnet
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const guideCommand = new SlashCommandBuilder()
  .setName('guide')
  .setDescription('FAQs')
  .addSubcommandGroup(group =>
    group
      .setName('testnet')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('swap-the-loan')
          .setDescription('You can swap the loan amount for another asset. For instance, if you have borrowed BTC...'),
      )
      .addSubcommand(option =>
        option
          .setName('get-testnet-tokens')
          .setDescription('You can get testnet ETH from starknets faucets to pay the transaction fees....'),
      )
      .addSubcommand(option =>
        option
          .setName('lend-my-assets')
          .setDescription('Currently, Hashstacks primary market consists of USDT, USDC, BTC, and BNB....'),
      )
      .addSubcommand(option =>
        option
          .setName('connect-my-wallet')
          .setDescription('To try out Hashstack zk testnet, you must have one of the compatible wallets installed....'),
      )
      .addSubcommand(option =>
        option
          .setName('add-more-funds-to-active-deposit')
          .setDescription('You can deposit more funds in your active deposit....'),
      )
      .addSubcommand(option =>
        option
          .setName('withdraw-my-deposits')
          .setDescription('You can withdraw your deposit after your lending tenure has been completed....'),
      )
      .addSubcommand(option =>
        option
          .setName('borrow-funds')
          .setDescription('Hashstack allows you to borrow up to 3 times the value of the collateral provided....'),
      )
      .addSubcommand(option =>
        option
          .setName('deposit-additional-collateral')
          .setDescription('You can add more collateral to your loan to prevent liquidation....'),
      )
      .addSubcommand(option =>
        option.setName('repay-my-loan').setDescription('You can repay the loan after one month if you want to....'),
      )
      .addSubcommand(option =>
        option
          .setName('withdraw-my-collateral')
          .setDescription('You can repay the loan after one month if you want to....'),
      )
      .addSubcommand(option =>
        option
          .setName('withdraw-loan-to-my-wallet')
          .setDescription('You can withdraw up to 70% of your collateral amount into your personal wallet....'),
      ),
  );

export default guideCommand.toJSON();
