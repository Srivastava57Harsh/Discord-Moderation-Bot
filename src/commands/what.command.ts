/// -------------------------------------------------------------------------------------- #
/// ** Slash Commands for statements starting from "what"
/// Defines the the slash command, its description, the subcommand group and subcommand for "what" statements
/// -------------------------------------------------------------------------------------- #
import { SlashCommandBuilder } from '@discordjs/builders';

const whatCommand = new SlashCommandBuilder()
  .setName('what')
  .setDescription('FAQs')
  //is
  .addSubcommandGroup(group =>
    group
      .setName('is')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('hashstack')
          .setDescription('Hashstack is a permissionless and decentralized zk-native money market.....'),
      )
      .addSubcommand(option =>
        option
          .setName('the-fee-structure-of-platform')
          .setDescription('The fee structure of Hashstack is as follows.....'),
      )
      .addSubcommand(option =>
        option
          .setName('fundraising')
          .setDescription(
            'Initial Coin Offerings (ICO) and Initial Exchange Offerings (IEO) offer emerging projects the.....',
          ),
      )
      .addSubcommand(option =>
        option
          .setName('overcollateralization')
          .setDescription(
            'The loans are mostly overcollateralized, i.e. we have to deposit collateral greater than.....',
          ),
      )
      .addSubcommand(option =>
        option
          .setName('liquidation')
          .setDescription('Liquidation is the process in which the collateral deposited by the borrower.....'),
      )
      .addSubcommand(option =>
        option
          .setName('leveraged-borrowing')
          .setDescription('This can be understood with a simple example. Lets say Bob has 100$ worth.....'),
      )
      .addSubcommand(option =>
        option
          .setName('total-value-locked')
          .setDescription('It denotes how much the total value of crypto assets is locked in a protocol.....'),
      )
      .addSubcommand(option =>
        option
          .setName('aprs-vs-apys')
          .setDescription('We can compare APR ( Annual Percentage Rate ) to Simple Interest.....'),
      )
      .addSubcommand(option =>
        option
          .setName('borrowing-and-lending')
          .setDescription('Borrowing and lending are one of the most important features of a financial.....'),
      ),
  )
  //assets-tokens
  .addSubcommandGroup(group =>
    group
      .setName('assets-tokens')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('can-you-borrow')
          .setDescription('Hashstack’s primary market will revolve around WBTC, USDT, USDC, BNB, and ETH. As the.....'),
      ),
  )
  //are
  .addSubcommandGroup(group =>
    group
      .setName('are')
      .setDescription('FAQs group')
      .addSubcommand(option =>
        option
          .setName('stablecoins')
          .setDescription(
            'As we all know that cryptocurrencies are very volatile assets. Therefore they cannot be used.....',
          ),
      )
      .addSubcommand(option =>
        option
          .setName('oracles')
          .setDescription(
            'Blockchain oracles are third-party services that provide smart contracts with external.....',
          ),
      ),
  );

export default whatCommand.toJSON();
