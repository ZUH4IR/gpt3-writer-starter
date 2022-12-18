const temp = 75;
const weather = "sunny";
const location = "San Francisco";

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
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
        console.log(basePromptPrefix)
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

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