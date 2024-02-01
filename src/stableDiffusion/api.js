const axios = require('axios');

const {
  stableDiffusionUrl
} = require('../../config/config.json');

exports.txt2imgApi = async (request) => {
  const url = `${stableDiffusionUrl}/txt2img`;
  return await axios.post(url, request).then(res => res.data);
};

exports.getModelsApi = async () => {
  const url = `${stableDiffusionUrl}/sd-models`;
  return await axios.get(url).then(res => res.data);
};

exports.getCurrentModelApi = async () => {
  const url = `${stableDiffusionUrl}/options`;

  const response = await axios.get(url).then(res => res.data);
  return response.sd_model_checkpoint;
};

exports.setModelApi = async (modelName) => {
  const url = `${stableDiffusionUrl}/options`;

  const payload = {
    sd_model_checkpoint: modelName
  };

  await axios.post(url, payload);
  return;
};