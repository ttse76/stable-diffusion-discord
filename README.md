# Stable Diffusion Discord Bot

A Discord bot to interact with the Stable Diffusion API

## Requirements

[AUTOMATIC111 Stable Diffusion Web Ui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Python v3.10.12

Node JS v20.9.0

Discord

A discord bot account. Check out the documentation [here](https://discordpy.readthedocs.io/en/stable/discord.html) to see how to setup an account for the bot.

## Setup

Clone and install the Stable Diffusion web ui from the link above and launch it with the `--api` argument

Clone or download the code for this repo

Open a command line in the main directory for the bot and run `npm i` to install dependencies

Before the bot can be launched, a config file must be generated. From the same command line, run `npm run initConfig` to run the configuration wizard. See below for information on each parameter in the config file. **NOTE: THE BOT WILL NOT WORK UNTIL THE CONFIGURATION FILE IS GENERATED**

Discord slash commands are required to be deployed to servers before they can be used. To do this, run `npm run deployCommands`
 - If you want to remove commands, run `npm run clearCommands`

Launch the bot with `npm start`

## Commands

The bot currently has 1 public command which will be deployed to all servers in `guildDeployIds` as well as the server in `adminGuildId` and a number of special admin commands which will only be deployed to `adminGuildId`. **NOTE: IT IS HIGHLY RECOMMENDED TO HAVE A SEPERATE SERVER FOR THE ADMIN CONTROLS AS THE CONTROLS WILL BE AVAILABLE TO EVERYONE IN A SERVER**

### Public Commands

`/txt2img`: This command will run the txt2img image generation and has 2 parameters
  - `prompt` (required): The text prompt for the image
  - `seed`: Optional parameter to set the seed value. If not set, a random seed will be generated

### Admin Commands

`getmodels`: Returns all available models in Stable Diffusion

`getmodel`: Returns currently loaded model

`setmodel`: Sets model to use.
  - `modelname` (required): Name of model to use. Use `getmodels` to get the model names and copy the one you want into `modelname`

## Config

The bot relies of a configuration file for important parameters that are essntial for the bot to work.

`token` (required): The token for the discord bot.

`loggerChannel`: The channel to output all the logs from the bot. This can contain important information if there are errors. If no channel is selected, logs will be printed to the console.

`stableDiffusionUrl`: The API url for your stable diffusion instance. Will have the default url if none is set

`guildDeployIds`: Guild/Server Ids to deploy the commands to

`adminGuildId`: Guild/Server to deploy the admin commands to
