const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const questionAsync = promisify(rl.question).bind(rl);

const isBlankOrWhitespace = (str) => {
  return str.trim() === '';
};

const saveConfig = async () => {
  try {
    const token = await questionAsync('Bot Token (required): ');
    
    if (isBlankOrWhitespace(token)) {
      throw Error('Bot token cannot be blank.');
    }

    const loggerChannel = await questionAsync('Logger Channel (will use console.log if blank): ');
    const stableDiffusionUrl = await questionAsync('Stable Diffusion URL (http://127.0.0.1:7861/sdapi/v1): ');
    const guildDeployIds = await questionAsync('Guilds to deploy bot (required, seperate ids with commas): ');

    if (isBlankOrWhitespace(guildDeployIds)) {
      throw Error('Must provide at least one guild to deploy to.')
    }

    const config = {
      token,
      loggerChannel: isBlankOrWhitespace(loggerChannel) ? null : loggerChannel,
      stableDiffusionUrl: isBlankOrWhitespace(stableDiffusionUrl) ? 'http://127.0.0.1:7861/sdapi/v1' : stableDiffusionUrl,
      guildDeployIds: guildDeployIds.split(',')
    };

    const configPath = path.join(__dirname, '..', '..', 'config', 'config.json');

    await fs.mkdir(path.dirname(configPath), { recursive: true });

    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    console.log('Config saved');
  } catch (err) {
    console.error('An error occurred: ', err);
  } finally {
    rl.close();
  }
};

saveConfig();