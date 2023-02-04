const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-lhOCdYxB9FUo5qAvqq2cqWcU",
  apiKey: process.env.REACT_APP_OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

async function CallApi() {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

  console.log(data.choices[0].text)
}

// CallApi();

// create a simple express API that calls the function.