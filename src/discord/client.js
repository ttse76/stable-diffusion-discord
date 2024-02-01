const {
  Client,
  Events,
  GatewayIntentBits
} = require('discord.js');

const guid = require('../modules/guid');
const logger = require('../modules/logger');
const stableDiffusion = require('../stableDiffusion');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  switch(commandName) {
    case 'txt2img':
      const txt2imgContext = guid.newGuid();
      const prompt = options.getString('prompt');
      const seed = options.getString('seed') ?? generateSeed();
      logger.logInfo(`${{ prompt, seed, userId: interaction.user.id }}`, txt2imgContext);
      await interaction.deferReply();

      try {
        const { embed, attachment } = await stableDiffusion.txt2Img(txt2imgContext, prompt, seed);
        await interaction.editReply({ embeds: [embed], files: [attachment] });
      } catch(err) {
        logger.logError(`error generating image`, txt2imgContext);
        logger.logError(err, txt2imgContext);

        // always log full error to console
        console.log(err);
        await interaction.editReply('There was an error generating the image.');
      }
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
