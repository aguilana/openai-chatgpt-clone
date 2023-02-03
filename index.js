
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-lhOCdYxB9FUo5qAvqq2cqWcU",
    apiKey: process.env.REACT_APP_OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();