<script lang="ts">
  import { current_group, current_subject } from "./stores/groups";
  import { Router, Link, Route, navigate } from "svelte-navigator";
  import { tabs } from "./stores/tab";
  import type { Group } from "./data/groups";
  import { selected_tab } from "./stores/tab";
  import GroupSettings from "../routes/groupsettings.svelte";
  //declare an object with name, intro, institution, image_link, department, group_link and batch
  export let group: Group;

  let isOpen = false;
  let justOpened = false;
  function toggle(e: MouseEvent) {
    // console.log("toggle");
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

<svelte:window on:click|stopPropagation={onClickOutside} />
<div
  class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3 h-full w-full"
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
        <ul class="py-1 font-Roboto">
          <li>
            <div
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
              on:click={() => {
                $current_group = group;
                $current_subject = group.subjects[0];
                $selected_tab = tabs[4];
                navigate("/home/chats");
              }}
            >
              Group Chat
            </div>
          </li>
          {#if group.access === "admin"}
            <li>
              <div
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
                on:click={() => {
                  navigate(`/groupsettings/${group.id}`);
                }}
              >
                Group Settings
              </div>
            </li>
          {/if}
          <li>
            <div
              class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
            >
              Leave
            </div>
          </li>
        </ul>
      </div>
    {/if}
  </div>
  <div class="flex flex-col items-center px-5 pb-0">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    {#if group.image_link != null}
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        src={group.image_link}
        alt="Group Photo"
      />
    {:else}
      <div class="mb-3 w-24 h-24 bg-slate-600 rounded-full shadow-lg" />
    {/if}
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
