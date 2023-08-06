import type { Meta } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const categories = (await import("$lib/data/categories.json")).default as Meta[];

  return {
    categories,
  };
};
