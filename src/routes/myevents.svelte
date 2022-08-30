<script lang="ts">
  import EventItem from "../lib/eventitem.svelte";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  import { dateStringToJSDate, type Event } from "../lib/data/event";
  import { datetimeStringToJSDate } from "../lib/data/event";

  let current_time = new Date();

  console.log(current_time);

  let events: Array<Event> = [
    {
      id: 1,
      title: "Event 1",
      time: "13:59",
      date: "2022-09-01",
      description: "This is event 1",
    },
    {
      id: 2,
      title: "Event 2",
      time: "13:59",
      date: "2022-09-05",
      description: "This is event 2",
    },
    {
      id: 3,
      title: "Event 3",
      time: "13:59",
      date: "2022-09-10",
      description: "This is event 3",
    },
    {
      id: 4,
      title: "Event 4",
      time: "13:59",
      date: "2022-09-10",
      description: "This is event 4",
    },
    {
      id: 5,
      title: "Event 5",
      time: "13:59",
      date: "2022-09-10",
      description: "This is event 5",
    },
    {
      id: 6,
      title: "Event 6",
      time: "13:59",
      date: "2022-09-10",
      description: "This is event 6",
    },
    {
      id: 7,
      title: "Event 7",
      time: "13:59",
      date: "2022-09-10",
      description: "This is event 7",
    },
  ];

  //sort the events based on end time, and then start time
  events.sort((a, b) => {
    let aDate = datetimeStringToJSDate(a.date, a.time);
    let bDate = datetimeStringToJSDate(b.date, b.time);
    if (aDate > bDate) {
      return 1;
    } else if (aDate < bDate) {
      return -1;
    } else {
      return 0;
    }
  });

  let showable_events: Array<Event> = events;

  let search_start_date = "";
  let search_end_date = "";

  function search() {
    if (search_start_date != "" && search_end_date != "") {
      showable_events = events.filter((event) => {
        return (
          dateStringToJSDate(event.date) >=
            datetimeStringToJSDate(search_start_date, "0:0") &&
          dateStringToJSDate(event.date) <=
            datetimeStringToJSDate(search_end_date, "23:59")
        );
      });
    } else showable_events = events;
  }

  // $: if (start_date) console.log(start_date);
  let draweropen: boolean = false;

  let newEvent: Event = {
    id: 0,
    title: "",
    time: "",
    date: "",
    description: "",
  };
  $: {
    console.log(
      newEvent.title,
      newEvent.description,
      newEvent.time,
      newEvent.date
    );
  }
</script>

<svelte:head>
  <title>Events</title>
</svelte:head>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 py-5 pl-10 min-h-screen">
  <div class="flex items-center pb-10 gap-5">
    <div class="flex items-center">
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        />
        <input
          name="start"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Roboto"
          bind:value={search_start_date}
          placeholder="Select date start"
        />
      </div>
      <span class="mx-4 text-gray-500">to</span>
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        />
        <input
          name="end"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Roboto"
          bind:value={search_end_date}
          placeholder="Select date end"
        />
      </div>
    </div>
    <button
      type="button"
      class="text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/10"
      on:click={search}>Search</button
    >
    <button
      type="button"
      class="text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/10"
      on:click={() => {
        search_start_date = "";
        search_end_date = "";
        showable_events = events;
      }}>Reset</button
    >
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
  </div>

  <div class="flex place-content-left">
    <ol class="relative border-l border-gray-200 dark:border-gray-700 w-full">
      {#each showable_events as e}
        <EventItem event={e} />
      {/each}
    </ol>
  </div>

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
        >New Event
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
          bind:value={newEvent.title}
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
          bind:value={newEvent.description}
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
          bind:value={newEvent.date}
        />
        <input
          type="time"
          id="appt"
          name="appt"
          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
          required
          bind:value={newEvent.time}
        />
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
        > Create Event</button
      >
    </div>
  </Drawer>
</div>
