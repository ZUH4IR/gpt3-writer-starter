import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// VARIABLES
const temp = 75;
const weather = "sunny";
// const lat = 33.17364087179997
// const lon = -96.73899922688479

// // Get city from Google Maps API
// async function getLocation() {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
//     const response = await fetch(url)
//     console.log('response: ', response)
//     const data = await response.json();
//     console.log('data: ' ,data.results[5].formatted_address);
// };

// Get request and response of prompt
const generateAction = async (req, res) => {
  const location = await getLocation();
  const basePromptPrefix = 
    `
        I am ${req.body.userInput}
        Create some possible outfits to wear today; it is ${temp} degrees and ${weather} today in ${location}.
        Explain to me each of your choices as follows (make sure there is a space between all lines):
        Outfit 1:
        Explanation 1:
        Outfit 2:
        Explanation 2:
    `
    console.log(basePromptPrefix) // LOG PROMT
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      temperature: 0.7,
      max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;