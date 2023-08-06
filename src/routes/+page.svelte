<script lang="ts">
  export let data;
</script>

<h4>Sci-Fi stories written by ChatGPT</h4>

{#each data.categories as category (category.slug)}
  <p><a href={`/${category.slug}`}>{category.title}</a> {category.description}</p>
{/each}
