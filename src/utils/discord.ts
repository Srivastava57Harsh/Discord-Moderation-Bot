/// -------------------------------------------------------------------------------------- #
/// ** Discord Object Handler**
/// Sets up the Discord client object and exports it for use in other files
/// -------------------------------------------------------------------------------------- #
import Discord, { GatewayIntentBits, Client, Partials } from 'discord.js';
import LoggerInstance from '../loaders/logger';
import Logger from '../loaders/logger';

let bot: Client;

export async function getDiscordBot() {
  try {
    if (!bot) {
      await initDiscordBot();
    }
    // console.log(bot);
    return bot;
  } catch (err) {
    LoggerInstance.error('❌  Error connecting to Bot', err);
  }
}

export async function initDiscordBot() {
  try {
    bot = new Discord.Client({
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
    });
    await bot.login(process.env.DISCORD_TOKEN || '');
    Logger.info('✔️  Discord Bot Login');
    // console.log(bot);
    return bot;
  } catch (err) {
    LoggerInstance.error('❌  Error connecting to Bot', err);
  }
}
