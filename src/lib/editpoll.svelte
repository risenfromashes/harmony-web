<script lang="ts">
  import type { Poll } from "./data/polls";
  import { fade } from "svelte/transition";
  import FaIcon from "../lib/faIcon.svelte";
  import { flip } from "svelte/animate";
  export let poll: Poll;
  export let show: boolean = false;

  //create a copy of poll in temp
  let temp: Poll = {
    id: poll.id,
    title: poll.title,
    // description: poll.description,
    options: [...poll.options],
    totalvote: poll.totalvote,
    votedOption: poll.votedOption,
  };

  function removeOption(id: string) {
    //decrement the count of votes of the options which have been removed
    temp.options.forEach((option) => {
      if (option.optionid === id) {
        temp.totalvote -= option.vote_count;
      }
    });
    //remove the option from the poll
    temp.options = temp.options.filter((option) => {
      return option.optionid !== id;
    });
    if (temp.votedOption === id) {
      temp.votedOption = "-1";
    }
  }

  function addNewOption() {
    //add an empty option to the poll
    //take the maximum of all existing and add 1 to that
    console.log("add new option");
    let max = 0;
    temp.options.forEach((option) => {
      if (Number(option.optionid) > max) max = Number(option.optionid);
    }),
      max++;
    temp.options.push({
      pollid: poll.id,
      optionid: max.toString(),
      option_title: "New Option",
      description: "",
      vote_count: 0,
      width: 0,
    });
    temp.options = temp.options;
  }

  function confirmupdate() {
    console.log("confirm update");
    show = false;
    //copy temp into poll
    poll = {
      id: temp.id,
      title: temp.title,
      // description: temp.description,
      options: [...temp.options],
      totalvote: temp.totalvote,
      votedOption: temp.votedOption,
    };
    // poll = temp;
    //update in database as well
  }
</script>

{#if show}
  <div
    id="authentication-modal"
    data-modal-placement="center"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-scroll overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"
    transition:fade
  >
    <div class="relative p-4 w-full max-w-md max-h-screen h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal"
          on:click={() => {
            show = false;
          }}
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
          <span class="sr-only">Close modal</span>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit Poll
          </h3>
          <form class="space-y-6">
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Poll Title</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={poll.title}
                required
              />
            </div>
            {#each temp.options as option (Number(option.optionid))}
              <div
                animate:flip
                class="bg-gray-600 rounded-lg p-2"
                transition:fade
              >
                <div class="flex justify-end">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 align-middle"
                    >Option Title</label
                  >
                  <button
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg align-middle text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    type="button"
                    on:click={() => removeOption(option.optionid)}
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
                    bind:value={option.option_title}
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Option Description (maximum 50 characters)</label
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
            <div class="flex justify-between mx-3">
              <button
                type="button"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                on:click={() => addNewOption()}>Add Option</button
              >
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                on:click={() => confirmupdate()}>Confirm</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}
