import { Configuration, OpenAIApi } from "openai";
import fs from "fs";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "I want you to act as sci-fi writer.",
    },
    {
      role: "user",
      content: `
        Generate a list of 42 categories into which sci-fi stories can be classified.
        Output JSON with the following structure:
        [
          {
            "title": "The title of the first category",
            "slug": "the-title-of-the-first-category",
            "description": "The description of the first category"
          },
          {
            "title": "The title of the second category",
            "slug": "the-title-of-the-second-category",
            "description": "The description of the second category"
          }
        ]

        Do not output any text before or after the JSON.
      `,
    },
  ],
  temperature: 1,
});

const categories = JSON.parse(response.data.choices[0].message?.content ?? "[]");
fs.writeFileSync("src/lib/data/categories.json", JSON.stringify(categories, null, 2) + "\n");
