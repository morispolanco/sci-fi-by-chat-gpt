import type { Meta } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const categories = (await import("$lib/data/categories.json")).default as Meta[];

  const category = categories.find((category) => category.slug === params.category_slug);

  if (!category) {
    throw error(404, "Not found");
  }

  const stories = (await import(`../../../lib/data/stories/${params.category_slug}.json`))
    .default as Meta[];

  const story = stories.find((story) => story.slug === params.story_slug);
  if (!story) {
    throw error(404, "Not found");
  }

  const paragraphs = (
    await import(`../../../lib/data/stories/${params.category_slug}/${params.story_slug}.json`)
  ).default as string[];

  return {
    story,
    paragraphs,
  };
};
