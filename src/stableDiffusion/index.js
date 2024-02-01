const StableDiffusionRequestBuiilder = require('stable-diffusion-api-request-builder');

const embedBuilder = require('../modules/embedBuilder');

const api = require('./api');

exports.txt2Img = async (context, textPrompt, seed) => {
  const request = new StableDiffusionRequestBuiilder()
    .setPrompt(textPrompt)
    .setSeed(seed);
  
  const response = await api.txt2imgApi(request);

  if (response.images === null || response.images.length === 0) {
    throw new Error('no images returned');
  }

  const image = response?.images[0];

  const { embed, attachment } = embedBuilder.buildEmbed(context, response.parameters, image)

  return { embed, attachment };
};

exports.getModels = async () => {
  const models = await api.getModelsApi();

  return models.map(model => model.title).sort();
};

exports.getCurrentModel = async () => {
  return await api.getCurrentModelApi();
};

exports.changeModel = async (modelName) => {
  await api.setModelApi(modelName);
  return;
};