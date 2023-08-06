<script lang="ts">
  export let data;
</script>

<h4><a href="/">Sci-Fi stories written by ChatGPT</a></h4>

<h3>{data.story.title}</h3>

{#each data.paragraphs as paragraph}
  <p>{paragraph}</p>
{/each}
