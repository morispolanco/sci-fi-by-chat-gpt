import { Configuration, OpenAIApi } from "openai";
import fs from "fs";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const categories = JSON.parse(fs.readFileSync("src/lib/data/categories.json", "utf-8")) as {
  title: string;
  slug: string;
  description: string;
}[];

for (const category of categories) {
  console.log(category.title);

  let stories: {
    title: string;
    slug: string;
    description: string;
  }[] = [];

  const messages = [
    {
      role: "system",
      content: "I want you to act as sci-fi writer.",
    },
    {
      role: "user",
      content: `
        In the category of sci-fi stories called "${category.title}" (${category.description}),
        Generate a list of 10 stories.
        The story titles should be unique an not mentioned before.

        Output JSON with the following structure:
        [
          {
            "title": "The title of the first story",
            "slug": "the-title-of-the-first-story",
            "description": "The short description of the first story"
          },
          {
            "title": "The title of the second story",
            "slug": "the-title-of-the-second-story",
            "description": "The short description of the second story"
          }
        ]

        Do not output any text before or after the JSON.
      `,
    },
  ] as { role: "system" | "user" | "assistant"; content: string }[];

  for (let i = 0; i < 10; i++) {
    console.log(i);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages,
      temperature: 1,
    });

    const result = response.data.choices[0].message?.content ?? "[]";
    ``;
    try {
      const chunk = JSON.parse(result);
      stories = [...stories, ...chunk];
      console.log(chunk);
    } catch {
      continue;
    }

    messages.push({
      role: "assistant",
      content: result,
    });
    messages.push({
      role: "user",
      content: "Generate 10 more stories in same format.",
    });
  }

  fs.writeFileSync(
    `src/lib/data/stories/${category.slug}.json`,
    JSON.stringify(stories, null, 2) + "\n",
  );
}
