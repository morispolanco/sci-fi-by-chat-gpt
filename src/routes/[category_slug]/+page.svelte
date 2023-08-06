<script lang="ts">
  export let data;
</script>

<h1>Sci-Fi stories by ChatGPT</h1>

<h2>{data.category.title}</h2>

<p>{data.category.description}</p>

<hr />

{#each data.stories as story (story.slug)}
  <p><a href={`/${data.category.slug}/${story.slug}`}>{story.title}</a> {story.description}</p>
{/each}
