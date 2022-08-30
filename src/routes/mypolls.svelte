<script lang="ts">
  import ShowPollitem from "../lib/showpollitem.svelte";
  import { getPolls, type Poll } from "../lib/data/polls";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { current_group } from "../lib/stores/groups";
  import Loader from "../lib/loader.svelte";

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    console.log(div.scrollHeight);
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  //declare an array of 5 Poll Objects
  let polls: Poll[];

  const loadPolls = async (gid: string) => {
    try {
      polls = await getPolls(gid);
    } catch (e) {
      console.log(e);
    }
  };

  let loadPromise;

  $: if ($current_group) {
    loadPromise = loadPolls($current_group.id);
  }

  function deletePoll(id: string) {
    console.log("got delete request for poll with id: " + id);
    const index = polls.findIndex((p) => p.id === id);
    console.log(index);
    if (index === -1) return;
    polls.splice(index, 1);
    polls = polls;
  }
</script>

<div class="bg-slate-900 min-h-screen">
  <div class="w-3/4 py-5 flex-1 mx-auto" bind:this={div}>
    {#if loadPromise}
      {#await loadPromise}
        <Loader />
      {:then}
        {#each polls as poll}
          <ShowPollitem {poll} {deletePoll} />
        {/each}
      {/await}
    {/if}
  </div>
</div>
