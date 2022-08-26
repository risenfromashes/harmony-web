<script lang="ts">
  import { navigate, useParams } from "svelte-navigator";
  import { onMount } from "svelte";

  import TreeCollapse from "./treecollapse.svelte";
  import type { Group } from "./data/groups";

  export let groups: Group[];
</script>

<div class="h-full w-2/12 bg-slate-800">
  <!-- Tree -->
  {#each groups as group}
    <TreeCollapse {group} />
  {/each}
</div>
