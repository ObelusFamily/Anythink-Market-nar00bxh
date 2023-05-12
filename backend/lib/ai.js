const axiosLib = require('axios');
const apiKey = process.env.OPENAI_API_KEY;

console.log(`apiKey=${apiKey}`);

const baseURL = 'https://api.openai.com';

const axios = axiosLib.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});

async function getImageUrl(prompt) {
  try {
    const response = await axios.post(
      `${baseURL}/v1/images/generations`,
      JSON.stringify({
        prompt,
        n: 1,
        size: '256x256',
      })
    );
    const url = await response.data.data[0].url;
    console.log(`url=${url}`);
    return url;
  } catch (error) {
    console.error(`failed to send request to openAI ${error}`);
  }
}

module.exports = {
  getImageUrl,
};
