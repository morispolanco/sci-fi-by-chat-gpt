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
  const storiesPath = `src/lib/data/stories/${category.slug}.json`;
  if (!fs.existsSync(storiesPath)) continue;

  console.log("# " + category.title);

  const stories = JSON.parse(fs.readFileSync(storiesPath, "utf-8")) as {
    title: string;
    slug: string;
    description: string;
  }[];

  for (const story of stories) {
    fs.mkdirSync(`src/lib/data/stories/${category.slug}`, { recursive: true });
    const storyPath = `src/lib/data/stories/${category.slug}/${story.slug}.json`;
    if (fs.existsSync(storyPath)) continue;

    console.log("## " + story.title);
    const messages = [
      {
        role: "system",
        content: "I want you to act as sci-fi writer.",
      },
      {
        role: "user",
        content: `
        Generate a sequence of 42 paragraphs (separated by blank line) for the body of the sci-fi story
        with title: """${story.title}"""
        and with description: """${story.description}"""

        Do not include the title in the output.

        Do not output extra text before or after.
        `,
      },
    ] as { role: "system" | "user" | "assistant"; content: string }[];
    for (;;) {
      try {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-16k",
          messages,
          temperature: 1,
        });

        const result = response.data.choices[0].message?.content ?? "[]";
        const paragraphs = result
          .trim()
          .split("\n\n")
          .map((paragraph) => paragraph.trim());
        fs.writeFileSync(storyPath, JSON.stringify(paragraphs, null, 2) + "\n");
        break;
      } catch {
        continue;
      }
    }
  }
}
