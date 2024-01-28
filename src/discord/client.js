const {
  Client,
  Events,
  GatewayIntentBits
} = require('discord.js');
const { v4: uuidv4} = require('uuid');

const logger = require('../modules/logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  switch(commandName) {
    case 'txt2img':
      const textPrompt = options.getString('prompt');
      const seed = options.getString('seed') ?? generateSeed();


      break;
  }
});

client.on(Events.ClientReady, async () => {
  await logger.initializeLogger(client);
});

exports.initializeClient = (token) => {
  client.login(token);
};

const generateSeed = () => {
  return Math.round(Math.random() * 100000000000000).toString()
};
