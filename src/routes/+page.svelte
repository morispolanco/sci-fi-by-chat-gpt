<script lang="ts">
  export let data;
</script>

<h1>Sci-Fi stories by ChatGPT</h1>

<p>This is a library of short stories written by ChatGPT.</p>
<p>Pick a category and then select a story to read.</p>

<hr />

{#each data.categories as category (category.slug)}
  <p><a href={`/${category.slug}`}>{category.title}</a> {category.description}</p>
{/each}
