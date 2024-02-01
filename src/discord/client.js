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
  const interactionContextId = guid.newGuid();

  switch(commandName) {
    case 'txt2img':
      const prompt = options.getString('prompt');
      const seed = options.getString('seed') ?? generateSeed();
      logger.logInfo(`${{ prompt, seed, userId: interaction.user.id }}`, interactionContextId);
      await interaction.deferReply();

      try {
        const { embed, attachment } = await stableDiffusion.txt2Img(interactionContextId, prompt, seed);
        await interaction.editReply({ embeds: [embed], files: [attachment] });
      } catch(err) {
        logger.logError(`error generating image`, interactionContextId);
        logger.logError(err, interactionContextId);

        // always log full error to console
        console.log(err);
        await interaction.editReply('There was an error generating the image.');
      }

      break;
    
    // admin commands
    case 'setmodel':
      try {
        const modelName = options.getString('modelname');
        await interaction.reply('changing model...');
        logger.logInfo('changing model...', interactionContextId);
        await stableDiffusion.changeModel(modelName);
        logger.logInfo('change complete', interactionContextId);
        await interaction.editReply('change complete');
      } catch(err) {
        logger.logError(`error changing model: ${err}`, interactionContextId);
        await interaction.editReply(`Error changing model\nContext Id: ${interactionContextId}`);
      }

      break;
    
    case 'getmodels':
      try {
        const models = await stableDiffusion.getModels();
        await interaction.reply(models.join("\n"));
      } catch(err) {
        logger.logError(`error fetching models: ${err}`, interactionContextId);
        await interaction.reply(`Error fetching available models\nContext Id: ${interactionContextId}`);
      }

      break;
    
    case 'getmodel':
      try {
        const model = await stableDiffusion.getCurrentModel();
        await interaction.reply(model);
      } catch(err) {
        logger.logError(`error fetching models: ${err}`, interactionContextId);
        await interaction.reply(`Error fetching model name\nContext Id: ${interactionContextId}`);
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
