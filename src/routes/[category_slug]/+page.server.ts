import type { Meta } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const categories = (await import("$lib/data/categories.json")).default as Meta[];

  const category = categories.find((category) => category.slug === params.category_slug);

  if (!category) {
    throw error(404, "Not found");
  }

  const stories = (await import(`../../lib/data/stories/${params.category_slug}.json`))
    .default as Meta[];

  const filteredStories: Meta[] = [];
  const set = new Set<string>();
  for (const story of stories) {
    if (set.has(story.slug)) continue;
    set.add(story.slug);
    filteredStories.push(story);
  }

  return {
    category,
    stories: filteredStories,
  };
};
