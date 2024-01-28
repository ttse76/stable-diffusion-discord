const axios = require('axios');
const stableDiffusion = require('../src/stableDiffusion');

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

    const response = await stableDiffusion.txt2Img(prompt, seed);

    expect(response.image).toBe(testApiResponse.images[0]);
    expect(response.parameters).toEqual(testApiResponse.parameters);
  });
});