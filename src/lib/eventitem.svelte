<script lang="ts">
  import FaIcon from "./faIcon.svelte";
  import Drawer from "../lib/drawer.svelte";
  import type { Event } from "../lib/data/event";
  import {
    remainingDays,
    datetimeStringToJSDate,
    getDateTimeString,
  } from "../lib/data/event";

  export let event: Event;

  $: daysLeft = remainingDays(datetimeStringToJSDate(event.date, event.time));

  let draweropen: boolean = false;
  $: console.log(event.title, draweropen);
</script>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<li class="mb-10 ml-6 dark:hover:bg-gray-800 rounded-lg p-3">
  <span
    class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
  >
    <FaIcon type="regular" icon="calendar-check" />
  </span>

  <h3
    class="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white font-JosefinSans"
  >
    {event.title}
    {#if daysLeft <= 2}
      <span
        class="bg-red-100 text-red-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-300 dark:text-red-900 ml-3"
        >Approaching</span
      >
    {:else if daysLeft <= 7}
      <span
        class="bg-green-100 text-green-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-300 dark:text-green-900 ml-3"
        >This Week</span
      >
    {/if}
    <button
      type="button"
      class="absolute right-5 text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/10"
      on:click|stopPropagation={() => (draweropen = true)}>Edit</button
    >
  </h3>
  <time
    class="block mb-2 text-base leading-none text-gray-400 dark:text-gray-500"
    >{getDateTimeString(datetimeStringToJSDate(event.date, event.time))}</time
  >

  <p class="mb-4 text-base font-Oxygen text-gray-500 dark:text-gray-400">
    {event.description}
  </p>
</li>

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
      >Edit Event
    </h5>
    <div class="mb-6">
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Title</label
      >
      <input
        type="text"
        id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Event Headline"
        required
        bind:value={event.title}
      />
    </div>
    <div class="mb-6">
      <label
        for="description"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Description</label
      >
      <textarea
        id="description"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write event description..."
        required
        bind:value={event.description}
      />
    </div>
    <div class="relative mb-6">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      />
      <input
        type="date"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
        placeholder="Select date"
        required
        bind:value={event.date}
      />
      <input
        type="time"
        id="appt"
        name="appt"
        class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
        required
        bind:value={event.time}
      />
    </div>
    <button
      type="submit"
      class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
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
      > Update Event</button
    >
    <button
      type="submit"
      class="text-white justify-center flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 w-full"
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
      > Delete Event</button
    >
  </div>
</Drawer>
