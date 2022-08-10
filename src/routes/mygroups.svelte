<script lang="ts">
  import Grouplist from "../lib/grouplist.svelte";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";

  let draweropen: boolean = false;
  let name: string = "";
  let department: string = "";
  let institution: string = "";
  let intro: string = "";
  const maxlength = 140;

  //declare an array of 20 users with id and different names
  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Doe" },
  //   { id: 3, name: "Jack Doe" },
  //   { id: 4, name: "Jill Doe" },
  //   { id: 5, name: "Joe Doe" },
  //   { id: 6, name: "Jenny Doe" },
  //   { id: 7, name: "Juan Doe" },
  //   { id: 8, name: "Jenny Doe" },
  //   { id: 9, name: "Juan Doe" },
  //   { id: 10, name: "Jenny Doe" },
  //   { id: 11, name: "Juan Doe" },
  //   { id: 12, name: "Jenny Doe" },
  //   { id: 13, name: "Juan Doe" },
  //   { id: 14, name: "Jenny Doe" },
  //   { id: 15, name: "Juan Doe" },
  //   { id: 16, name: "Jenny Doe" },
  //   { id: 17, name: "Juan Doe" },
  //   { id: 18, name: "Jenny Doe" },
  //   { id: 19, name: "Juan Doe" },
  //   { id: 20, name: "Jenny Doe" },
  // ];

  function add_group() {
    //write stuffs here...
    // reload the group list maybe
  }
</script>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 py-10 mt-10">
  <Grouplist />
  <!-- drawer init and show -->
  <button
    class="absolute top-20 left-20 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg lg:ml-40 ml-10 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    type="button"
    data-drawer-target="drawer-form"
    data-drawer-show="drawer-form"
    aria-controls="drawer-form"
    on:click|stopPropagation={() => (draweropen = !draweropen)}
  >
    <FaIcon type="regular" icon="plus" />
    Create New Group
  </button>
  <Drawer transition_axis="-x" open={draweropen}>
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
            for="institution"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Institution</label
          >
          <input
            type="text"
            id="institution"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Institution"
            required
            bind:value={institution}
          />
        </div>
        <div class="mb-6">
          <label
            for="department"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Department</label
          >
          <input
            type="text"
            id="department"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Department"
            required
            bind:value={department}
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
        <div class="relative mb-6">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          />
        </div>
        <button
          type="submit"
          class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          on:click={add_group}
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
          > Create group</button
        >
      </form>
    </div>
  </Drawer>
</div>
