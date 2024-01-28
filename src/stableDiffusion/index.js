const StableDiffusionRequestBuiilder = require('stable-diffusion-api-request-builder');

const api = require('./api');

exports.txt2Img = async (textPrompt, seed) => {
  const request = new StableDiffusionRequestBuiilder()
    .setPrompt(textPrompt)
    .setSeed(seed);
  
  const response = await api.txt2imgApi(request);

  return { image: response.images[0], parameters: response.parameters }
};