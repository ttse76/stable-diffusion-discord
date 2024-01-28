const { 
  guildDeployIds,
  token
} = require('../../config/config.json');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const rest = new REST({version: '9' }).setToken(token);

async function registerCommands(guildId) {
  try {
    await rest.put(Routes.applicationGuildCommands(id, guildId), { body: publicCommands });
    console.log(`Successfully registered commands to server ${guildId}`);
  } catch (error) {
    console.error(error);
  }
}

Promise.all(guildDeployIds.map(registerCommands))
  .then(() => console.log('Deployment complete'))
  .catch(console.error);