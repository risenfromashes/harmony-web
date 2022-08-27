<script lang="ts">
  import { Link, useParams } from "svelte-navigator";
  import { slide } from "svelte/transition";
  import { useLocation } from "svelte-navigator";
  import FaIcon from "./faIcon.svelte";
  import type { Subject, Group } from "./data/groups";
  import { current_subject, current_group } from "./stores/groups";
  import TreeEntry from "./treeentry.svelte";
  import { onDestroy } from "svelte";

  let isOpen = false;

  export let group: Group;

  onDestroy(() => {
    isOpen = false;
  });

  const toggleCollapse = () => {
    isOpen = !isOpen;
  };
</script>

<div class="w-full">
  <div
    class={"w-full h-12 flex items-center pl-4 cursor-pointer hover:bg-slate-700" +
      (isOpen ? " bg-slate-700" : "")}
    on:click={toggleCollapse}
  >
    {#if isOpen}
      <FaIcon className="text-white" icon="chevron-down" />
    {:else}
      <FaIcon className="text-white" icon="chevron-right" />
    {/if}

    <FaIcon className="text-white ml-4" icon="school" />
    <p class="ml-3 font-semibold">{group.name}</p>
  </div>

  {#if isOpen}
    <div class="w-full" transition:slide|local={{ duration: 200 }}>
      {#each group.subjects as subject}
        <TreeEntry {group} {subject} />
      {/each}
    </div>
  {/if}
</div>
