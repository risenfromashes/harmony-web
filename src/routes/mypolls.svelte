<script lang="ts">
  import ShowPollitem from "../lib/showpollitem.svelte";
  import {
    addPoll,
    getPolls,
    removePoll,
    type Poll,
    type PollEvent,
    type SendPoll,
  } from "../lib/data/polls";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import { current_group } from "../lib/stores/groups";
  import Loader from "../lib/loader.svelte";
  import { notifyTarget } from "../lib/events/notifytarget";

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

  const handleEvent = (e: CustomEvent) => {
    const event: PollEvent = e.detail;

    if (event.group_id != $current_group.id) {
      return;
    }

    if (event.op === "add") {
      polls = [event.poll, ...polls];
    } else if (event.op === "delete") {
      polls = polls.filter((poll) => poll.id != event.id);
    } else if (event.op === "update") {
      let i = polls.findIndex((p) => event.id === p.id);
      if (i >= 0) {
        let lastVote = polls[i].voted_option;
        polls[i] = event.poll;
        if (lastVote !== "-1" && polls[i].voted_option === "-1") {
          // this is hacky way of handling the issue with event notifications
          // there is no way for the server to distinguish between clients receiving the same notification
          polls[i].voted_option = lastVote;
        }
        polls = polls;
      } else {
        polls = [event.poll, ...polls];
      }
    }
  };

  onMount(() => {
    notifyTarget.addEventListener("poll", handleEvent);
  });

  onDestroy(() => {
    notifyTarget.removeEventListener("poll", handleEvent);
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

  const deletePoll = async (id: string) => {
    try {
      await removePoll(id);
    } catch (e) {
      console.log(e);
    }
  };

  let emptyPoll: SendPoll = {
    title: "New Poll",
    options: [],
  };

  let newPoll: SendPoll = structuredClone(emptyPoll);

  let draweropen: boolean = false;

  const removeOption = (index: number) => {
    //remove the option from the poll
    newPoll.options = newPoll.options.filter((option) => {
      return option.index !== index;
    });
  };

  const addNewOption = () => {
    //add an empty option to the poll
    //take the maximum of all existing and add 1 to that
    console.log("add new option");
    let max = 0;
    newPoll.options.forEach((option) => {
      max = Math.max(max, option.index);
    });
    max++;
    newPoll.options.push({
      index: max,
      title: "New Option",
      description: "",
    });
    newPoll.options = newPoll.options;
  };

  const submitPoll = async () => {
    console.log("confirm update");
    try {
      let id = await addPoll(newPoll, $current_group.id);
      console.log("new poll: " + id);
      draweropen = false;
      newPoll = structuredClone(emptyPoll);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 min-h-screen">
  <div class="w-3/4 py-5 flex-1 mx-auto" bind:this={div}>
    {#if loadPromise}
      {#await loadPromise}
        <Loader />
      {:then}
        {#each polls as poll (poll.id)}
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
      {#each newPoll.options as option (Number(option.index))}
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
              on:click={() => removeOption(option.index)}
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
          class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          on:click={() => addNewOption()}>Add Option</button
        >
      </div>
      <button
        disabled={newPoll.options.length === 0}
        type="submit"
        class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        on:click|stopPropagation={() => {
          submitPoll();
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
