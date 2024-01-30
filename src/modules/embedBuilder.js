const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

/**
 * Builds embed object
 * @param {UUID} context context id
 * @param {Object} parameters image generation parameters
 * @param {String} image base64 encoded image
 * @returns an object containing the embed and image attachment
 */
exports.buildEmbed = (
  context,
  parameters,
  image
) => {
  const fields = toFields(parameters);
  const buf = Buffer.from(image, 'base64');

  const attachment = new AttachmentBuilder(buf, { name: `${context}.png`});

  const embed = new EmbedBuilder()
    .setColor(0x109e00)
    .setImage(`attachment://${context}.png`)
    .addFields(...fields)
    .setFooter({ text: `${context}`});

  return { embed, attachment };
};

const toFields = (parameters) => {
  const fieldParameters = {
    Sampler: parameters.sampler_index,
    Steps: parameters.steps,
    CFG: parameters.cfg_scale,
    Seed: parameters.seed
  };

  return Object.keys(fieldParameters).map(key => {
    return {
      name: key,
      value: `${fieldParameters[key]}`,
      inline: true 
    };
  });
  
};