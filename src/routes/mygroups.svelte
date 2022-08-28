<script lang="ts">
  import Grouplist from "../lib/grouplist.svelte";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  import { fade } from "svelte/transition";
  import { loadUserHandles, type UserHandle } from "../lib/data/user";
  import Loader from "../lib/loader.svelte";
  import { addGroup } from "../lib/data/groups";
  import { current_user } from "../lib/stores/user";

  let draweropen: boolean = false;
  let name: string = "";
  let intro: string = "";
  const maxlength = 140;

  let filteredUsers: UserHandle[] = [];
  let searchInput;
  let search_term = "";

  let users: UserHandle[] = [];

  let added_users: UserHandle[] = [];

  const load = async () => {
    try {
      users = await loadUserHandles();
    } catch (e) {
      console.log(e);
    }
  };

  const loadPromise = load();

  const add_user = (user: UserHandle) => {
    if (!added_users.includes(user)) {
      added_users.push(user);
      added_users = added_users;
      search_term = "";
    }
  };

  const remove_user = (user) => {
    added_users.splice(added_users.indexOf(user), 1);
    added_users = added_users;
    search_term = "";
  };

  const create_group = async () => {
    //write stuffs here...
    // reload the group list maybe
    try {
      await addGroup(current_user.user_id, name, intro, added_users);
      draweropen = false;
    } catch (e) {
      console.log(e.message);
    }
  };

  $: if (search_term === "") {
    filteredUsers = [];
  }

  //write a function to make the matching part of str bold
  const makeMatchBold = (str) => {
    let match = search_term.toLowerCase();
    let matchIndex = str.toLowerCase().indexOf(match);
    if (matchIndex === -1) {
      return str;
    }
    const ret: string =
      str.substring(0, matchIndex) +
      "<b>" +
      str.substring(matchIndex, matchIndex + match.length) +
      "</b>" +
      str.substring(matchIndex + match.length);
    return ret;
  };

  $: {
    if (search_term) {
      filteredUsers = users.filter((user) => {
        return (
          user.user_name.length >= search_term.length &&
          user.user_name.toLowerCase().slice(0, search_term.length) ===
            search_term.toLowerCase() &&
          !added_users.includes(user)
        );
      });
    }
  }
</script>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 py-10 mt-10">
  <Grouplist />
  <!-- drawer init and show -->
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
  {#await loadPromise}
    <Loader />
  {:then}
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
          >New group
        </h5>
        <form action="#" class="mb-6">
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Group Name</label
            >
            <input
              type="text"
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              bind:value={name}
            />
          </div>
          <div class="mb-6">
            <label
              for="intro"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Intro ({maxlength - intro.length} characters remaining)</label
            >
            <textarea
              id="intro"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="A few words about the group..."
              {maxlength}
              bind:value={intro}
            />
          </div>

          <form>
            <div class="my-2">
              {#each added_users as u}
                <span
                  id="badge-dismiss-default"
                  class="inline-flex items-center py-1 px-2 mr-2 my-1 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-200 dark:text-green-800 font-OpenSans"
                  out:fade
                >
                  {u.user_name}
                  <button
                    type="button"
                    class="rounded-lg inline-flex items-center p-0.5 ml-1 text-sm text-green-400 bg-transparent hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-300 dark:hover:text-green-900"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                    on:click={() => remove_user(u)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      /></svg
                    >
                    <span class="sr-only">Remove badge</span>
                  </button>
                </span>
              {/each}
            </div>
            <input
              type="text"
              id="search-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search users to add"
              required
              bind:value={search_term}
              bind:this={searchInput}
            />
          </form>

          {#if filteredUsers.length > 0}
            <div
              id="dropdown"
              class="z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 w-full"
            >
              <ul
                class="py-1 text-base text-gray-700 dark:text-gray-200 w-full"
                aria-labelledby="dropdownDefault"
              >
                {#each filteredUsers as user, i}
                  <li>
                    <button
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left rounded-lg"
                      on:click|stopPropagation={() => {
                        add_user(user);
                      }}
                    >
                      {@html makeMatchBold(user.user_name)}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <button
            type="submit"
            class="my-5 text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={create_group}
          >
            Create group</button
          >
        </form>
      </div>
    </Drawer>
  {/await}
</div>
