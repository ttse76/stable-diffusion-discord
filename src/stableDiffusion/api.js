const axios = require('axios');

const {
  stableDiffusionUrl
} = require('../../config/config.json');

exports.txt2imgApi = async (request) => {
  const url = `${stableDiffusionUrl}/txt2img`;
  return await axios.post(url, request).then(res => res.data);
};