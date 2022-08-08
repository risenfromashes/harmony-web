<script lang="ts">
  //declare an object with name, intro, institution, image_link, department, group_link and batch
  export let group = {
    id: 1,
    name: "",
    intro: "",
    institution: "",
    image_link: "",
    department: "",
    group_link: "",
    batch: "",
  };

  let isOpen = false;
  let justOpened = false;
  function toggle(e: MouseEvent) {
    console.log("toggle");
    isOpen = !isOpen;
    if (isOpen) {
      justOpened = true;
    }
  }
  function onClickOutside() {
    if (justOpened) {
      justOpened = false;
    } else {
      isOpen = false;
    }
  }
</script>

<!-- <div
  class="font-Roboto flex h-full flex-row shadow-md rounded-lg border hover:cursor-pointer dark:border-gray-700 dark:bg-gray-80 px-3 py-5 gap-5 hover:bg-gray-100 dark:hover:bg-gray-700"
  on:click={() => (window.location.pathname = "{group.group_link}")}
>
  <div class="ml-4 flex-none overflow-hidden my-auto">
    <img
      class="h-20 w-20 rounded-2xl object-cover shadow-lg"
      src={group.image_link}
      alt=""
    />
  </div>
  <div class="grid grid-cols-10 p-3">
    <div class="col-span-10 grid grid-cols-10 h-1/4">
      <h5
        class="col-span-9 col-start-1 mb-2 grid place-items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {group.name}
      </h5>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="col-span-1 grid place-items-end rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="button"
      >
        <span class="sr-only">Open dropdown</span>
        <svg
          class="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
          /></svg
        >
      </button>
      <div
        id="dropdown"
        class="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Edit</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Export Data</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-10">
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {group.intro}
      </p>
    </div>
  </div>
</div> -->

<svelte:window on:click|stopPropagation={onClickOutside} />
<div
  class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3"
>
  <div class="flex justify-end px-4 pt-1 relative">
    <button
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      on:click={toggle}
      type="button"
    >
      <span class="sr-only">Open dropdown</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
        /></svg
      >
    </button>
    {#if isOpen}
      <div
        class="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 block"
        style="position: absolute; top: 3rem; right: -2rem;"
        on:click|stopPropagation={() => {}}
      >
        <ul class="py-1 font-Hahmlet">
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Group Chat</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Group Settings</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Leave</a
            >
          </li>
        </ul>
      </div>
    {/if}
  </div>
  <div class="flex flex-col items-center px-5 pb-5">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      class="mb-3 w-24 h-24 rounded-full shadow-lg"
      src={group.image_link}
      alt="Group Photo"
    />
    <h5
      class="mb-1 text-xl font-medium text-gray-900 dark:text-white font-JosefinSans"
    >
      {group.name}
    </h5>
    <span
      class="text-sm text-gray-500 dark:text-gray-400 text-clip overflow-hidden font-OpenSans whitespace-normal"
      >{group.intro}</span
    >
  </div>
</div>
