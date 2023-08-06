<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<article>
  <slot />
</article>

<style>
  article {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
