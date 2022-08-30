<script lang="ts">
  import ShowPollitem from "../lib/showpollitem.svelte";
  import { getPolls, type Poll } from "../lib/data/polls";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";
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

  let newPoll: Poll = {
    id: "",
    title: "",
    options: [],
    total_vote: 0,
    voted_option: "-1",
  };

  let draweropen: boolean = false;

  function removeOption(id: string) {
    //decrement the count of votes of the options which have been removed
    newPoll.options.forEach((option) => {
      if (option.id === id) {
        newPoll.total_vote -= option.vote_count;
      }
    });
    //remove the option from the poll
    newPoll.options = newPoll.options.filter((option) => {
      return option.id !== id;
    });
    if (newPoll.voted_option === id) {
      newPoll.voted_option = "-1";
    }
  }

  function addNewOption() {
    //add an empty option to the poll
    //take the maximum of all existing and add 1 to that
    console.log("add new option");
    let max = 0;
    newPoll.options.forEach((option) => {
      if (Number(option.id) > max) max = Number(option.id);
    }),
      max++;
    newPoll.options.push({
      id: max.toString(),
      poll_id: newPoll.id,
      title: "New Option",
      description: "",
      vote_count: 0,
      width: 0,
    });
    newPoll.options = newPoll.options;
  }

  function confirmupdate() {
    console.log("confirm update");
    //copy newPoll into poll
    newPoll = {
      id: newPoll.id,
      title: newPoll.title,
      // description: newPoll.description,
      options: [...newPoll.options],
      total_vote: newPoll.total_vote,
      voted_option: newPoll.voted_option,
    };
    // poll = temp;
    //update in database as well
  }
</script>

<svelte:head>
  <title>Polls</title>
</svelte:head>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

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
  <button
    class="h-14 w-14 fixed bottom-12 right-12 z-10 shadow-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full lg:ml-40 ml-10 text-sm mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    type="button"
    data-drawer-target="drawer-form"
    data-drawer-show="drawer-form"
    aria-controls="drawer-form"
    on:click|stopPropagation={() => (draweropen = !draweropen)}
  >
    <FaIcon type="regular" icon="plus" className="text-xl" />
  </button>

  <Drawer transition_axis="-x" bind:open={draweropen}>
    <!-- drawer component -->
    <div slot="body">
      <h5
        id="drawer-label"
        class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        <svg
          class="w-5 h-5 mr-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          /></svg
        >New Poll
      </h5>
      <div class="mb-12">
        <label
          for="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Title</label
        >
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Poll Title"
          required
          bind:value={newPoll.title}
        />
      </div>
      {#each newPoll.options as option (Number(option.id))}
        <div
          animate:flip
          class="bg-gray-700 rounded-lg p-2 my-2"
          transition:fade|local
        >
          <div class="flex justify-end">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 align-middle"
              >Option Title</label
            >
            <button
              class="text-gray-400 bg-transparent {newPoll.options.length === 1
                ? 'cursor-not-allowed'
                : 'hover:bg-gray-200 hover:text-gray-900'} rounded-lg align-middle text-sm ml-auto inline-flex items-center {newPoll
                .options.length > 1 &&
                'dark:hover:bg-gray-800 dark:hover:text-white'}"
              type="button"
              on:click={() => removeOption(option.id)}
              disabled={newPoll.options.length === 1}
            >
              <FaIcon
                type="regular"
                icon="minus"
                className="text-sm px-2 py-1"
              />
            </button>
          </div>
          <div class="mb-2">
            <input
              type="text"
              id="title"
              class="bg-gray-50 my-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={option.title}
              required
            />
          </div>
          <div>
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Option Description (50 characters)</label
            >
            <textarea
              id="description"
              rows="2"
              maxlength="50"
              class="block p-2.5 my-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={option.description}
            />
          </div>
        </div>
      {/each}
      <div class="flex justify-center mx-auto my-5">
        <button
          type="button"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          on:click={() => addNewOption()}>Add Option</button
        >
      </div>
      <button
        type="submit"
        class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        on:click|stopPropagation={() => {
          // do stuffs
          draweropen = false;
        }}
        ><svg
          class="w-5 h-5 mr-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          /></svg
        > Create Poll</button
      >
    </div>
  </Drawer>
</div>
