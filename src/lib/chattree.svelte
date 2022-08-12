<script lang="ts">
  import Chattreecollapse from "./chattreecollapse.svelte";
  import type { Guild } from "./data/chats";

  export let guilds: Array<Guild>;
</script>

<div class="h-full w-2/12 bg-slate-800">
  <!-- Tree -->
  {#each guilds as guild}
    <Chattreecollapse {guild} />
  {/each}
</div>
