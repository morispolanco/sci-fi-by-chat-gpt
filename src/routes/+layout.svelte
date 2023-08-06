<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<article>
  <slot />

  <hr />
  <div class="margin-bottom">
    Created by <a href="https://github.com/tzador" target="_blank">Tim</a>
    using <a href="https://chat.openai.com/">ChatGPT</a>
  </div>
</article>

<style>
  article {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
