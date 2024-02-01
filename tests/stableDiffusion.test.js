const axios = require('axios');
const stableDiffusion = require('../src/stableDiffusion');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const guid = require('../src/modules/guid');
jest.mock('axios');

describe('stable diffusion api tests', () => {
  test('txt2img request success', async () => {
    const prompt = 'test prompt';
    const seed = 1234;
  
    const testApiResponse = {
      images: ['1234abcd'],
      parameters: {
        prompt,
        seed
      }
    }

    axios.post.mockResolvedValue({ data: testApiResponse });
    
    const context = guid.newGuid();
    const { embed, attachment } = await stableDiffusion.txt2Img(context, prompt, seed);

    expect(embed).toBeInstanceOf(EmbedBuilder);
    expect(attachment).toBeInstanceOf(AttachmentBuilder);
  });

  const imagesResponses = [[], null];
  test.each(imagesResponses)('error on no images', async (imageResponse) => {
    const prompt = 'test prompt';
    const seed = 1234;
    
    const apiResponse = {
      images: imageResponse,
      parameters: {
        prompt,
        seed
      }
    }

    axios.post.mockResolvedValue({ data: apiResponse });

    const context = guid.newGuid();

    expect(async () => {
      await stableDiffusion.txt2Img(context, prompt, seed)
    }).rejects.toThrow('no images returned');
  });
});