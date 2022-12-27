import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Get request and response of prompt
const generateAction = async (req, res) => {
  const temp = Math.floor((req.body.temp - 273.15) * 9/5 + 32)
  const weather = req.body.weather
  const city = req.body.city
  const activity = req.body.userInputActivity ? `for this activity: ${req.body.userInputActivity}` : "";
 

  const basePromptPrefix = 
    `
        I am ${req.body.userInputDescribe}
        I want to make sure I am properly dressed for today ${activity}
        Create some possible outfits to wear today based on the information given; It is ${temp} degrees Farenheit and ${weather} today in ${city}.
        You will also tell me where to buy each item.
        Explain to me each of your choices as follows (make sure there is a new line after each parameter):

        Outfit 1:

        Explanation 1:
        
        Where to buy:

        --

        Outfit 2:
        
        Explanation 2:
        
        Where to buy:
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