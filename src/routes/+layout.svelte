<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<article>
  <div class="margin-top margin-bottom">
    <a href="https://news.ycombinator.com/item?id=37021050" target="_blank">Discuss on HN</a>
  </div>

  <slot />

  <hr />

  <div class="margin-bottom">
    <a href="https://github.com/tzador/sci-fi-by-chat-gpt">GitHub</a>
  </div>
</article>

<style>
  article {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
