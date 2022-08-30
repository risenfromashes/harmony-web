<script lang="ts">
  import { updatePoll, type Poll, type UpdatePoll } from "./data/polls";
  import { fade } from "svelte/transition";
  import FaIcon from "../lib/faIcon.svelte";
  import { flip } from "svelte/animate";
  import Post from "./post.svelte";
  export let poll: Poll;
  export let show: boolean = false;

  //create a copy of poll in temp
  let newPoll: UpdatePoll = {
    id: poll.id,
    title: poll.title,
    options: poll.options.map((option, index) => ({
      index: index,
      ...option,
    })),
  };

  function removeOption(index: number, id: string) {
    //remove the option from the poll
    newPoll.options = newPoll.options.filter((option) => option.index != index);
    if (poll.voted_option === id) {
      poll.voted_option = "-1";
    }
  }

  function addNewOption() {
    //add an empty option to the poll
    //take the maximum of all existing and add 1 to that
    let max = 0;
    newPoll.options.forEach((option) => (max = Math.max(max, option.index)));
    max++;

    newPoll.options.push({
      id: "0",
      index: max,
      title: "New Option",
      description: "",
    });
    newPoll.options = newPoll.options;
  }

  const submitUpdate = async () => {
    console.log("confirm update");
    try {
      await updatePoll(newPoll, poll.id);
      show = false;
    } catch (e) {
      console.log(e);
    }
  };
</script>

{#if show}
  <div
    id="authentication-modal"
    data-modal-placement="center"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-scroll overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"
    transition:fade|local
  >
    <div class="relative p-4 w-full max-w-md max-h-screen h-full md:h-auto">
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-600"
      >
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
                bind:value={newPoll.title}
                required
              />
            </div>
            {#each newPoll.options as option (Number(option.index))}
              <div
                animate:flip
                class="bg-gray-600 rounded-lg p-2"
                transition:fade|local
              >
                <div class="flex justify-end">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 align-middle"
                    >Option Title</label
                  >
                  <button
                    class="text-gray-400 bg-transparent {newPoll.options
                      .length === 1
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-200 hover:text-gray-900'} rounded-lg align-middle text-sm ml-auto inline-flex items-center {newPoll
                      .options.length > 1 &&
                      'dark:hover:bg-gray-800 dark:hover:text-white'}"
                    type="button"
                    on:click={() => removeOption(option.index, option.id)}
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
                on:click={() => submitUpdate()}>Confirm</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}
