<script lang="ts">
  export let data;
</script>

<p>The below Sci-Fi story was written by ChatGPT</p>

<h3>{data.story.title}</h3>

{#each data.paragraphs as paragraph}
  <p>{paragraph}</p>
{/each}
