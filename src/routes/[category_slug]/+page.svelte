<script lang="ts">
  export let data;
</script>

<h4><a href="/">Sci-Fi stories written by ChatGPT</a></h4>

<h3>{data.category.title}</h3>

<p>{data.category.description}</p>

{#each data.stories as story (story.slug)}
  <p><a href={`/${data.category.slug}/${story.slug}`}>{story.title}</a> {story.description}</p>
{/each}
