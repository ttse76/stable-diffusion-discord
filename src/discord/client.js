const {
  Client,
  Events,
  GatewayIntentBits
} = require('discord.js');

const logger = require('../modules/logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on(Events.ClientReady, async () => {
  await logger.initializeLogger(client);
});

exports.initializeClient = (token) => {
  client.login(token);
};