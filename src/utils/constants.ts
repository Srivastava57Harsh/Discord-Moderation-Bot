/// -------------------------------------------------------------------------------------- #
/// ** Defining all the constants used in the project ** ///
/// -------------------------------------------------------------------------------------- #
import { GuildMember } from 'discord.js';

export const COMMANDS_LIST = [
  '/ : To get the answers to frequently asked questions',
  '!gm : To post your GM (only works in #gm channel)',
  '!gn : To post your GN (only works in #gm channel)',
  '!commands : To get the list of commands',
  '!gmLeaderboard -a | -m | -w : To get the leaderboard of GMs for all time, month or week. (only works in #gm channel)',
  '!gnLeaderboard -a | -m | -w : To get the leaderboard of GNs for all time, month or week. (only works in #gm channel)',
];

export const COMMANDS = {
  prefix: '!Hash',
  faq: '/',
  membercount: 'membercount',
  gm: '!gm',
  gn: '!gn',
  showCommandsList: `!commands`,
  gmLeaderBoard: '!gmLeaderboard',
  gnLeaderBoard: '!gnLeaderboard',
  allTimeLeaderBoardSuffix: '-a',
  monthlyLeaderBoardSuffix: '-m',
  weeklyLeaderBoardSuffix: '-w',
};

export const DAYS = {
  allTime: 0,
  month: 30,
  week: 7,
};

export const INFO = {
  MEMBER_JOIN: (member: GuildMember) => {
    return {
      title: `A new member joined the server 🥳!`,
      message: `<@${member.id}> joined the server! Welcome to the _0xHashstack Community!`,
    };
  },

  MEMBER_JOIN_DM: (member: GuildMember) => {
    return {
      title: `Welcome to the community 🥳!`,
      message: `Hello ${member.toString()} ,\nI am **Hash**, **0xHashstack's discord assistant.**\n Let's get you jumpstarted in the community of **0xHashstack**\nWe have an extremely rewarding C2E (contribute 2 earn) program which rewards our community for their contribution: https://hashstack.crew3.xyz/questboard  \n\nWe also have our zk testnet live: https://zk.hashstack.finance/ \n\nYou can keep track of our events and twitter spaces by following our Twitter: https://twitter.com/0xHashstack`,
    };
  },

  CAPTCHA: () => {
    return {
      title: `Captcha Verification`,
      message: `Please write the chracters as shown in the image. You have 150 seconds to do so.\n You have one attempt only, on failure to the same you can regenerate the captcha by writing anything in the genral channel of the server.`,
    };
  },

  CAPTCHA_SUCCESS: () => {
    return {
      title: `Verification Success 🥳! `,
      message: `You have been verified successfully! Now you can send messages in the server!`,
    };
  },

  DISPLAY_LEADERBOARD: (type: string, time: string, list: Array<string>) => {
    let topTenList = '';
    list.map(item => {
      if (item != undefined) {
        topTenList += `${item}\n `;
      }
    });
    return {
      title: `${time} Leaderboard for ${type} 🥳!`,
      message: `Top 10 members of the list :\n\n ${topTenList} `,
    };
  },

  COMMANDS_LIST: (list: Array<string>) => {
    let topTenList = '';
    list.map((item, index) => {
      if (item != undefined) {
        topTenList += `${index + 1}. ${item}\n\n `;
      }
    });
    return {
      title: `List of all the commands 🥳!`,
      message: `You can use these to interact with me :\n\n **${topTenList}** `,
    };
  },

  WRONG_CHANNEL_COMMAND: () => {
    return {
      title: `Oops! Not an appropriate command for this channel!`,
      message: ` Seems like you are trying to use the gm channel commands in the wrong channel, please use this command in the #gm channel !`,
    };
  },

  WARN: (member: string, message: string) => {
    return {
      title: `${member}\n${message}`,
      message: `Please follow the rules and guidelines of the server!`,
    };
  },
};

export const MENTIONS = {
  EVERYONE: '@everyone',
  HERE: '@here',
  HASHFAM: '@hashfam',
};

export const COLORS = {
  SUCCESS: [21, 174, 55],
  INFO: [218, 247, 166],
  ERROR: [244, 41, 41],
  WARNING: [255, 177, 0],
  ANNOUNCEMENT: [38, 186, 255],
  // REACTION_ROLE: [191, 0, 255],
};

export const ERRORS = {
  INVALID_COMMAND: {
    title: "Oops! I didn't get that",
    message: 'It seems you have entered an invalid command.\n\n**Help**\nType `!Hash -c` for a list of commands',
  },
};

export const BLACKLISTED_WORDS = [
  '#1',
  '100%',
  '100% free',
  '100% satisfied',
  '50% off',
  'all new',
  'bargain',
  'best price',
  'bonus',
  'brand new pager',
  'cost',
  'costs',
  'credit',
  'discount',
  'doodlebox',
  'doodlees',
  'email harvest',
  'email marketing',
  'fast cash',
  'for free',
  'for only',
  'free and free',
  'free consultation',
  'free minting',
  'free sample',
  'free trial',
  'free website',
  'from the crypto market',
  'give it away',
  'giving away',
  'giving it away',
  'highest conversions',
  'how to earn',
  'how to earn $',
  'https://t.me/Andersonwatts1',
  'https://twitter.com/ioi_work',
  'i will teach',
  'in just 72 hours',
  'incredible deal',
  'insurance',
  'limited quantity',
  'lower interest rate',
  'lowest price',
  'massive community',
  'prize',
  'prizes',
  'profits',
  'promise',
  'promise you',
  'public free minting',
  'sale',
  'sales',
  'sample',
  'satisfaction',
  'send me a direct message',
  'whatsapp',
  'within 72 hours',
];

export const BLACKLISTED_INVITES = [
  `discord.gg`,
  `.gg/`,
  `.gg /`,
  `. gg /`,
  `. gg/`,
  `discord .gg /`,
  `discord.gg /`,
  `discord .gg/`,
  `discord .gg`,
  `discord . gg`,
  `discord. gg`,
  `discord gg`,
  `discordgg`,
  `discord gg /`,
];

export const BLACKLISTED_LINKS = [
  'telegram.com',
  'telegram.com/',
  'telegram .com',
  'telegram .com/',
  'telegram. com',
  't.me',
  'telegram.org',
  'telegram.me',
  't.me/',
  't. me',
  'telegram. org',
  'telegram. me',
  'telegram.org/',
  'telegram.me/',
  't .me',
  'telegram .org',
  'telegram .me',
  't .me/',
  'telegram .org/',
  'telegram .me/',
  't me',
  'telegram org',
  'telegram me',
  'tme',
  'telegramorg',
  'telegramme',
  't me/',
  'telegram org/',
  'telegram me/',
  't me /',
  'telegram org /',
  'telegram me /',
  'reddit.com',
  'reddit.com/',
  'reddit .com',
  'reddit .com/',
  'reddit com',
  'redditcom',
  'reddit com/',
  'reddit com /',
  'reddit .com /',
];

export const WHAT_IS_COMMANDS = [
  'hashstack',
  'fundraising',
  'overcollateralization',
  'liquidation',
  'leveraged-borrowing',
  'total-value-locked',
  'aprs-vs-apys',
  'borrowing-and-lending',
];

export const WHAT_IS_COMMANDS_ANSWERS = [
  //hashstack
  'Hashstack is a permissionless and decentralized zk-native money market protocol enabling undercollateralized borrowing. https://hashstack.finance/',
  //fundraising
  'Initial Coin Offerings (ICO) and Initial Exchange Offerings (IEO) offer emerging projects the opportunity to raise funds without the need for banks and other financial institutions. Powered by blockchains, ICOs allow companies to sell tokens in exchange for funding, assuming that the tokens will generate a return for investors. Traditionally, banks have charged massive fees for facilitating business securitization and Initial Public Offerings (IPO), but blockchain technology can help avoid those fees.',
  //overcollateralization
  'The loans are mostly overcollateralized, i.e. we have to deposit collateral greater than the value of what we are borrowing. This is because of the volatility in Crypto and prevents instant liquidation',
  //liquidation
  'Liquidation is the process in which the collateral deposited by the borrower is sold if they cannot repay the loan on time. In the case of DeFi lending platforms, If the borrower’s collateral value drops below the value of the borrowed asset and they do not deposit additional collateral to maintain the collateral value, the loan gets liquidated.',
  //leveraged borrowing
  'This can be understood with a simple example.\nLet us say Bob has 100$ worth of ETH. He borrowed USDC worth 80$ and gave ETH as collateral.\nNow he goes to Uniswap and swapped USDC for ETH.\nHe again deposits 80$ of ETH into Aave and borrows 64$ of USDC. And again repeats the process.\nNow, if the price of ETH increases by 10%, Bob would get 18$ instead of 10$.\n\nThis is called leveraged borrowing.\nHowever, there are some risks associated with leverage borrowing. If the price of the deposited collateral decreases, there are chances that Bob may get liquidated ( all of the BOB’s assets may be eaten away ).',
  //Total Value Locked
  'It denotes how much the total value of crypto assets is locked in a protocol. It’s a great way to measure the health of a DeFi protocol.',
  //APRs vs APYs
  'We can compare APR ( Annual Percentage Rate ) to Simple Interest. Therefore, the interest earned from the investment is not added to the principal amount at the maturity of the investment.\nAPY ( Annual Percentage Yield ) is the overall interest earned on a particular investment when the interest is compounded at regular intervals.\nThis must be going way too complex for you. Don’t worry; we will simplify it for you.\nImagine earning 10% interest on an FD, and the interest is compounded annually.\nSo our APR would be 10%.\nYou will be surprised to know that APY will also be 10% for the first year as it’s not being compounded yet. However, the APY for a 2 year FD would be 10.25%.\nTherefore APY is the exact interest rate you will get by investing in a particular investment scheme. The greater the frequency of the compounding periods, the greater will be the APY.\n\nHere’s an example of an FD that\nCompounded semi-annually - 10.25%\nCompounded Daily - 10.52%',
  //borrowing and lending
  'Borrowing and lending are one of the most important features of a financial system. Open, Decentralized borrowing and lending have many advantages over the traditional credit-based system. These platforms are built on public Blockchains. They minimize the amount of trust required and cryptographic verification methods secure them. As no centralized party is involved, lending and borrowing will be cheaper, faster, and more efficient than the traditional financial system.',
];

export const WHAT_ARE_COMMANDS = ['stablecoins', 'oracles'];

export const WHAT_ARE_COMMANDS_ANSWERS = [
  //stablecoins
  'As we all know that cryptocurrencies are very volatile assets. Therefore they cannot be used for regular payments. That’s when stablecoins come in. Stablecoins are usually pegged to the value of any real-world asset ( usually the US Dollar ) and can be used on the blockchain. Some of the popular stablecoins are USDT, DAI, and USDC.',
  //oracles
  'Blockchain oracles are third-party services that provide smart contracts with external information. They serve as bridges between blockchains and the outside world.\n\nOracles provide real-world data, such as stock prices, weather, etc., to smart contracts.\n\nSuppose that Alice and Bob place a bet on who the winner of the Indian election will be. Alice believes that the BJP will win, while Bob believes that Congress will be the winner. They agree on the terms of the bet and lock their funds in a smart contract, which will release all the funds to the winner based on the election results.',
];

export const HOW_DOES_COMMANDS = ['get-price-feeds', 'calculate-interest-rates'];

export const HOW_DOES_COMMANDS_ANSWERS = [
  //get price feeds
  'Hashstack uses Empiric Network to get both price and computational feeds. The Price feeds are used as a reference price for the users. Computational feeds on the other hand, are used to calculate the volatility of the assets, which in turn drives the calculation of permissible CDR.',
  //calculate interest rates
  'Hashstack uses the asset utilization ratio to calculate the APRs for both lenders and borrowers. To know more about our interest rate model, visit https://hashstack.notion.site/Interest-rate-model-1a113212099945dfb363715d1be2f988',
];

export const GUIDE_COMMANDS = [
  'swap-the-loan',
  'get-testnet-tokens',
  'lend-my-assets',
  'connect-my-wallet',
  'add-more-funds-to-active-deposit',
  'withdraw-my-deposits',
  'borrow-funds',
  'deposit-additional-collateral',
  'repay-my-loan',
  'withdraw-my-collateral',
  'withdraw-loan-to-my-wallet',
];

export const GUIDE_COMMANDS_ANSWERS = [
  'You can swap the loan amount for another asset. For instance, if you have borrowed BTC, you can swap it with USDT, UDSC, and BNB in the secondary market.\n\nHere is how you can swap \n- From the active loans section of the passbook, select the loan which you want to swap.\n- A pop-up will appear. Click on the *Swap* button.\n- Select the *Swap Loan* option and select the asset with which you want to swap your loan.\n- Click on *Swap Loan*. You will be prompted to sign the transaction.\n- After a successful transaction, you will receive a confirmation message.\n- If you want to swap it back into your loan (originally borrowed asset), select the *Swap to Loan* option. Click on the *Swap to Loan* button and verify the transaction in your wallet.\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw',
  'You can get testnet ETH from starknets faucets to pay the transaction fees.\nHere are the steps\n- Copy your public address from the wallet and paste it on [this](https://faucet.goerli.starknet.io/) website (Starknet Faucet).\n- After you get some ETH for paying the transaction fees, return to the dashboard. Then click the *Get Token* button.\n- Select the token of your choice from the pop-up menu.\n- You will be prompted to sign the transaction.Refer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw\n\nAlternatively, you can add tokens to your wallet from the following addresses:\n1. USDC `0x7ac56b3078e4428fdb3cc9cd257ce9cb77cc20f3ae0ed466c35f73e75ed42c8`\n2. BTC `0x0921f2737b52742c68c8d56f265c777988cbfeb60495ca2940663cf67ea4008`\n3. USDT `0x5d41add963bc6de5ba86cb1bec147f739df42a55c5d995b782da4534b2152ad`\n4. BNB `0x66212ade7afb8a9be4b085d90baa7b6ceb05bf3524d79fcdd8d7aae3885aa3d`\n\n',
  'Currently, Hashstacks primary market consists of USDT, USDC, BTC, and BNB. You can lend these assets to the protocol to earn up to 15% annualized interest.\n\n*Here are the steps to lend assets -*\n1. From the dashboard, click the *Deposit* button next to the asset you want to lend and select the asset.\n 2. You can check the interest rates of these assets on the dashboard, which may vary depending on the MCPs (Minimum Commitment Period).\n\n💡 At the moment, Hashstack has 4 MCP options:\n- None (No MCP)\n- 2 Weeks.\n- 1 Month.\n- 3 Months.\n\n3. After deciding on your investment, you can proceed with the confirmation of your deposit by clicking on *Deposit*.\n4. After signing the transaction on your wallet, you will receive a message confirming a successful deposit.',
  'To try out [Hashstacks zk testnet,](http://zk.hashstack.finance) you must have one of the compatible wallets installed. In this guide, we will walk you through the end-to-end process of creating an account on Starknet L2 compatible wallet and connecting with Hashstack"`"s zk testnet. \n\n*For ease, we will use Braavos wallet as a reference.* \n Here are the steps - \n- Download and install the Braavos chrome extension from [here](https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma).\n- If you have a StarkNet wallet, you can import it via Braavos. If not, you can create a new one.\n- After logging into your wallet, click on the *Connect* button to connect your wallet to Hashstack. Make sure you are on “Testnet 2”.\nAfter a successful connection, Hashstack’s dashboard screen will appear.\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw',
  'You can deposit more funds in your active deposit.\nHere are the steps - \n- From the home screen, click on Passbook\n- Click on Active deposits.\n- Select the deposit to which you want to add your assets.\n- Click on Add to Deposit.\n- Enter the amount and hit the *Add to Deposit* button.\n- You will be prompted to sign the transaction in your wallet. After that, you will receive a confirmation message for the same.\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw\nNote:💡 The MCP will remain the same. You can withdraw after your initial deposit duration has been completed. (a 3-day lock-in period will be applicable.)\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw\nNote:💡 A 3-day lock-in period will be applicable on your deposits, excluding the deposits with no MCPs.',
  'You can withdraw your deposit after your lending tenure has been completed. \n- From the active deposits section of the passbook, click on the deposit which you want to withdraw.\n- Enter the amount you want to withdraw and click on the *Withdraw deposit* button.',
  'Hashstack allows you to borrow up to 3 times the value of the collateral provided.\nLet us take a look at how we can borrow from the protocol - \n1. On the Dashboard screen, you will see a *Borrow* button next to the assets of Hashstacks primary market. Click on it.\n2. Once the pop-up box appears, there, you can borrow the asset by providing collateral. Currently, Hashstack accepts the following as collateral:\na. USDT\nb. USDC\nc. BTC\nd. BNB\n3. Once you have entered the amount, click the Request Loan button.\n4. You can check your loan status in the active loans section of the passbook. Here is what it will look like -',
  'You can add more collateral to your loan to prevent liquidation. \n\nHere is how you can do that - \n- From the active loans section, select the loan in which you want to add collateral to.\n- Select Add Collateral.\n- Enter the amount you want to add and hit the *Add to Collateral* button.\n\nLiquidation is a process where your collateral will be sold in the open market if your debt-to-collateral ratio exceeds the adequate value. \nBorrowers will get a notification if their loan position is nearing liquidation. Thus, borrowers must maintain their debt-to-collateral ratio and deposit more collateral, if required to prevent liquidation.\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw',
  'You can repay the loan after one month if you want to. \n- From the loan actions, click on *Repay* button.\n- Enter the amount that you want to repay.\n- Click on *Repay* and sign the transaction in your wallet.\n💡 Note: A 3-day lock-in period is implemented on the collateral when you repay the loan. After that, you can withdraw your collateral.\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw',
  'You can withdraw your collateral after you repay the loan. \n\nHere is how - \n- From the passbook section on the home screen, click on *Repaid loans.*\n- Select the loan whose collateral you want to withdraw.\n- Click on withdraw collateral and sign the transaction.\n\nRefer the resources given below:\nhttps://www.youtube.com/watch?v=2m8Ww24X6Yw',
  'You can withdraw up to 70% of your collateral amount into your personal wallet. \n\nHere is how - \n- From the loan actions, click on *Withdraw*.\n- Enter the amount that you want to withdraw.\n- Click on Withdraw and sign the transaction in your wallet.\n💡 Note: If you try to withdraw more than 70% of your collateral value, the transaction will fail.',
];

export const IMAGES = {
  FEE_STRUCTURE_IMAGE:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/open-fee-structure.png',
  SWAP_LOAN_IMAGE:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/swap_loans_pic_1.png',
  LEND_ASSETS_IMAGE_1:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/lend_assets_pic.png',
  LEND_ASSETS_IMAGE_2:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/lend_assets_pic_2.png',
  CONNECT_WALLET_IMAGE:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/connect_wallet_pic.png',
  BORROW_IMAGE_1:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/borrow_pic_1.png',
  BORROW_IMAGE_2:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/borrow_pic_2png.png',
  DEPOSIT_COLLATERAL_IMAGE:
    'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/deposit_collateral_pic_1.png',
};

export const VIDEOS = {
  SWAP_LOAN_VIDEO: 'https://common-static-assets.s3.ap-southeast-1.amazonaws.com/discord-moderation-bot/Swap_Loan.mov',
};
