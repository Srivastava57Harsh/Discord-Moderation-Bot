/// -------------------------------------------------------------------------------------- #
/// ** TEST CONSTANTS **
/// Constants used in testing
/// -------------------------------------------------------------------------------------- #
import { Message } from 'discord.js';

export const TEST_DB = 'test';

export const TEST_DATE = 'Dec 25 2022 00:00:00';

export const TEST_ID = '1111111111111111111';

export const member = {
  id: TEST_ID,
  displayName: 'testUser',
};

export const messageType = {
  incomingUser: {
    id: TEST_ID,
    isMod: false,
    isAdmin: false,
    username: 'testUser',
  },
  incomingMessage: {
    content: '',
    channel: {
      send: jest.fn(),
    },
  },
};

export const message = {
  channel: {
    send: jest.fn(),
  },
  content: '',
  author: {
    send: jest.fn(),
    bot: false,
  },
  member: { id: TEST_ID, timeout: jest.fn() },
} as unknown as Message;

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

export const BLACKLISTED_TAGS = ['@everyone', '@here', '@hashfam'];

export const GM_ALL_TIME_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 15 times',
  '**2. testUser** - 3 times',
  '**3. Archisman Das** - 2 times',
  '**4. Daksh | Alpha** - 0 times',
  '**5. Testing-Bot** - 0 times',
];

export const GM_MONTHLY_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 15 times',
  '**2. testUser** - 3 times',
  '**3. Archisman Das** - 2 times',
  undefined,
  undefined,
];

export const GM_WEEKLY_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 15 times',
  '**2. testUser** - 3 times',
  undefined,
  undefined,
  undefined,
];

export const GN_ALL_TIME_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 11 times',
  '**2. testUser** - 3 times',
  '**3. Archisman Das** - 0 times',
  '**4. Daksh | Alpha** - 0 times',
  '**5. Testing-Bot** - 0 times',
];

export const GN_MONTHLY_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 11 times',
  '**2. testUser** - 3 times',
  undefined,
  undefined,
  undefined,
];

export const GN_WEEKLY_LEADERBOARD = [
  '**1. Harsh S | Hashstack** - 11 times',
  '**2. testUser** - 3 times',
  undefined,
  undefined,
  undefined,
];

export const GM_COMMAND = '!gm';

export const GN_COMMAND = '!gn';

export const DATABASE_DATA = [
  {
    userId: '698042593849638974',
    joinedDiscord: true,
    gmTotalCount: 15,
    gnTotalCount: 11,
    gmLastDate: '1671906600000',
    gnLastDate: '1671906600000',
    gnStreak: 9,
    gmStreak: 9,
    gmAllTimeLongestStreak: 8,
    gnAllTimeLongestStreak: 0,
    userName: 'Harsh S | Hashstack',
    wasTimedOut: false,
  },
  {
    userId: '617999554108850186',
    userName: 'Archisman Das',
    joinedDiscord: true,
    gmTotalCount: 2,
    gnTotalCount: 0,
    gmLastDate: '1669660200000',
    gnLastDate: 'Mon Jan 01 1900 00:00:00',
    gnStreak: 0,
    gmStreak: 0,
    gmAllTimeLongestStreak: 2,
    gnAllTimeLongestStreak: 0,
    wasTimedOut: false,
  },
  {
    userId: '725780346217562116',
    userName: 'Daksh | Alpha',
    joinedDiscord: true,
    gmTotalCount: 0,
    gnTotalCount: 0,
    gmLastDate: 'Mon Jan 01 1900 00:00:00',
    gnLastDate: 'Mon Jan 01 1900 00:00:00',
    gnStreak: 0,
    gmStreak: 0,
    gmAllTimeLongestStreak: 0,
    gnAllTimeLongestStreak: 0,
    wasTimedOut: true,
  },
  {
    userId: '1055592522610638989',
    userName: 'Testing-Bot',
    joinedDiscord: true,
    gmTotalCount: 0,
    gnTotalCount: 0,
    gmLastDate: 'Mon Jan 01 1900 00:00:00',
    gnLastDate: 'Mon Jan 01 1900 00:00:00',
    gnStreak: 0,
    gmStreak: 0,
    gmAllTimeLongestStreak: 0,
    gnAllTimeLongestStreak: 0,
    wasTimedOut: true,
  },
];
