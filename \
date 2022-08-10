<script lang="ts">
  import GroupCard from "./groupcard.svelte";
  import FaIcon from "./faIcon.svelte";
  import { login } from "../lib/stores/login";
  import { navigate } from "svelte-navigator";
  import { type Group, get_groups } from "../lib/data/groups";

  let groups: Array<Group> = [];

  let load_groups = (async () => {
    try {
      groups = await get_groups();
    } catch (e) {
      navigate("/login");
    }
  })();

  let showable_groups = [];

  let search_term = "";

  $: {
    if (search_term) {
      // console.log(search_term);
      //filter groups based on search term, considering name, intro, institution, department, batch
      showable_groups = groups.filter((group) => {
        return group.name.toLowerCase().includes(search_term.toLowerCase());
        // ||
        // group.intro.toLowerCase().includes(search_term.toLowerCase()) ||
        // group.institution.toLowerCase().includes(search_term.toLowerCase()) ||
        // group.department.toLowerCase().includes(search_term.toLowerCase()) ||
        // group.batch.toLowerCase().includes(search_term.toLowerCase())
      });
    } else {
      showable_groups = groups;
    }
  }
</script>

{#await load_groups}
  <p class="mx-auto my-auto">loading...</p>
{:then}
  <!-- card showing v2 -->
  <div class="py-10">
    <!-- <div class="pb-4 bg-white dark:bg-gray-900 grid place-items-center"> -->
    <div class="pb-4 bg-white dark:bg-slate-900 grid place-items-center">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <FaIcon
            icon="search"
            className="flex justify-center items-center w-5 h-5 text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          type="text"
          id="table-search"
          class="block p-2 pl-10 w-80 text-sm font-OpenSans text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for groups"
          bind:value={search_term}
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 m-3 w-4/6 mx-auto auto-rows-fr place-items-center"
    >
      {#each showable_groups as group}
        <GroupCard {group} />
      {/each}
    </div>
  </div>
{:catch error}
  <p class="mx-auto my-auto" style="color: red">{error.message}</p>
{/await}
