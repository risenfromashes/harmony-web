<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import FaIcon from "./faIcon.svelte";

  const location = useLocation();

  $: query = new URLSearchParams($location.search);
</script>

<div class="h-full w-10/12 px-10 py-8">
  {#if $location.search.length > 0}
    <h1 class="text-5xl font-bold mb-12">Chats</h1>

    <p class="text-xl">
      <strong>Group ID: </strong>
      {query.get("g")}
    </p>

    <p class="text-xl">
      <strong>Channel ID: </strong>
      {query.get("c")}
    </p>
  {:else}
    <div class="h-full w-full flex flex-col items-center justify-center">
      <p class="text-2xl text-slate-700">Select a group and channel to view the chat.</p>
      <FaIcon icon="bolt" className="text-[20rem] text-slate-800" />
    </div>
  {/if}
</div>
