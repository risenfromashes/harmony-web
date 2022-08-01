<script lang="ts">
  import { Link } from "svelte-navigator";
  export let routes: Map<string, string>;
</script>

<nav class="flex justify-center w-full">
  {#each [...routes] as [name, path]}
    <Link class="mx-4 text-lg underline" to={path}>{name}</Link>
  {/each}
</nav>
