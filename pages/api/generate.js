import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Get request and response of prompt
const generateAction = async (req, res) => {
  const basePromptPrefix = 
    `
        I am ${req.body.userInput}
        Create some possible outfits to wear today; it is ${Math.floor((req.body.temp - 273.15) * 9/5 + 32)} degrees and ${req.body.weather} today in ${req.body.city}.
        Explain to me each of your choices as follows (make sure there is a space between all lines):
        Outfit 1:
        Explanation 1:
        Outfit 2:
        Explanation 2:
    `
    console.log(basePromptPrefix) // LOG PROMT
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}\n`,
      temperature: 0.7,
      max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;