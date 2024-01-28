const { SlashCommandBuilder } = require('@discordjs/builders');

const publicCommands = [
  new SlashCommandBuilder()
    .setName('draw')
    .setDescription('Draw an image with AI')
    .addStringOption(option => option.setName('prompt').setDescription('Image prompt').setRequired(true))
    .addStringOption(option => option.setName('seed').setDescription('Seed'))
];

const adminCommands = [
  ...publicCommands,

  new SlashCommandBuilder()
    .setName('setmodel')
    .setDescription("Set model to use")
    .addStringOption(option => option.setName('modelname').setDescription('Name of model to set').setRequired(true)),
  
  new SlashCommandBuilder()
    .setName('getmodels')
    .setDescription("Get all models"),

  new SlashCommandBuilder()
    .setName('getmodel')
    .setDescription("Get current model")
];

exports.getPublicCommands = () => publicCommands;

exports.getDevCommands = () => adminCommands;