const { EmbedBuilder } = require('discord.js');

exports.buildEmbed = (
  context,
  parameters
) => {
  const fields = toFields(parameters);

  return new EmbedBuilder()
    .setColor(0x109e00)
    .setImage(`attachment://${context}.png`)
    .addFields(...fields)
    .setFooter({ text: `${context}`});
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