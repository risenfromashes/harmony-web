<script lang="ts">
  import type { Poll } from "./data/polls";
  import FaIcon from "../lib/faIcon.svelte";
  import PollVoteBar from "./poll_vote_bar.svelte";
  import { flip } from "svelte/animate";
  import { slide } from "svelte/transition";
  import Editpoll from "./editpoll.svelte";

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
      if (poll.totalvote > 0)
        option.width = Math.round((option.vote_count / poll.totalvote) * 100);
      else option.width = 0;
    });
  }

  function castVote(optionid: string) {
    //update the vote count for the option
    poll.options.forEach((option) => {
      if (option.optionid === optionid) {
        option.vote_count++;
      }
    });
    //update the total vote count
    poll.totalvote++;
    //update the hasVoted flag
    poll.votedOption = optionid;
  }

  function removeVote(optionid: string) {
    //update the vote count for the option
    poll.options.forEach((option) => {
      if (option.optionid === optionid) {
        option.vote_count--;
      }
    });
    //update the total vote count
    poll.totalvote--;
    //update the hasVoted flag
    poll.votedOption = "-1";
  }
</script>

{#if showedit}
  <Editpoll bind:poll bind:show={showedit} />
{/if}

<div class="my-5 p-5 bg-slate-800 rounded-lg" transition:slide>
  <div class="flex justify-between">
    <div>
      <p
        class="text-4xl text-gray-500 dark:text-gray-400 font-Oxygen my-2 font-extrabold"
      >
        {poll.title}
      </p>
      <p class="text-xl font-medium text-gray-500 dark:text-gray-400">
        {poll.totalvote} total votes
      </p>
    </div>
    <div class="flex justify-end items-center">
      <button
        type="button"
        class="text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/10 mx-2"
        on:click={() => {
          showedit = true;
        }}>Edit Poll</button
      >
      <button
        type="button"
        class="text-white bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/10 mx-2"
        on:click={() => deletePoll(poll.id)}>Delete Poll</button
      >
    </div>
  </div>
  <div class="grid auto-rows-fr">
    {#each poll.options as option (Number(option.optionid))}
      <div
        class="grid grid-cols-10 my-2 h-full w-full"
        animate:flip={{
          duration: () => 750 * Math.sqrt(Number(option.optionid)),
        }}
      >
        <span
          class="text-xl font-medium text-blue-600 dark:text-blue-500 col-span-2 truncate"
          >{option.option_title}</span
        >
        <div class="col-span-6 px-1">
          <PollVoteBar bind:percent={option.width} />
        </div>

        <span
          class="text-xl font-medium text-blue-600 dark:text-blue-500 mx-auto col-span-1"
          >{option.width}% ({option.vote_count})</span
        >
        {#if poll.votedOption == "-1"}
          <button
            class="h-10 w-10 shadow-xl text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full lg:ml-5 text-sm mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:cursor-not-allowed disabled:bg-green-700 col-span-1"
            type="button"
            on:click|preventDefault={() => castVote(option.optionid)}
          >
            <FaIcon type="regular" icon="plus" className="text-sm" />
          </button>
        {:else if poll.votedOption == option.optionid}
          <button
            class="h-10 w-10 shadow-xl text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full lg:ml-5 text-sm mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 disabled:cursor-not-allowed disabled:bg-red-700 col-span-1"
            type="button"
            disabled={poll.votedOption != option.optionid}
            on:click|preventDefault={() => removeVote(option.optionid)}
          >
            <FaIcon type="regular" icon="minus" className="text-sm" />
          </button>
        {/if}
      </div>
    {/each}
  </div>
</div>
