<script lang="ts">
  import type { Poll } from "./data/polls";
  import FaIcon from "../lib/faIcon.svelte";
  import { flip } from "svelte/animate";
  import { slide } from "svelte/transition";
  import Editpoll from "./editpoll.svelte";
  import ShowPollOption from "./showpolloption.svelte";

  export let poll: Poll;
  let showedit: boolean = false;
  //sort the poll options by vote count
  const sortOptions = (options: any[]) => {
    return options.sort((a, b) => {
      return b.vote_count - a.vote_count;
    });
  };

  export let deletePoll;

  $: {
    poll.options = sortOptions(poll.options);
    poll.options.forEach((option) => {
      if (poll.total_vote > 0)
        option.width = Math.round((option.vote_count / poll.total_vote) * 100);
      else option.width = 0;
    });
  }
</script>

{#if showedit}
  <Editpoll bind:poll bind:show={showedit} />
{/if}

<div class="my-5 p-5 bg-slate-800 rounded-lg" transition:slide|local>
  <div class="flex justify-between">
    <div>
      <p
        class="text-4xl text-gray-500 dark:text-gray-400 font-Oxygen my-2 font-extrabold"
      >
        {poll.title}
      </p>
      <p class="text-xl font-medium text-gray-500 dark:text-gray-400">
        {poll.total_vote} total votes
      </p>
    </div>
    <div class="flex justify-end items-center">
      <button
        type="button"
        class="text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-shadow rounded-lg text-sm px-5 py-2 text-center w-1/10 mx-2"
        on:click={() => {
          showedit = true;
        }}
      >
        <FaIcon icon="pencil" />&nbsp;&nbsp;Edit Poll
      </button>
      <button
        type="button"
        class="text-white bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium transition-shadow rounded-lg text-sm px-5 py-2 text-center w-1/10 mx-2"
        on:click={() => deletePoll(poll.id)}
      >
        <FaIcon icon="trash" />&nbsp;&nbsp;Delete Poll
      </button>
    </div>
  </div>
  <!-- if you use auto-rows-fr, then opening one option will cause all others to expand (but not showing option), because all rows have to be of same width -->
  <!-- but then again, if you do not use it, then voted or unvoted options will be of different widths, leading to mismatched version -->
  <!-- so, as solution I chose to insert a dummy div tag with equal height as the button, hackerman!!! -->
  <div class="grid">
    {#each poll.options as option (Number(option.id))}
      <div
        animate:flip={{
          duration: 1000,
        }}
      >
        <ShowPollOption bind:poll bind:option />
      </div>
    {/each}
  </div>
</div>
