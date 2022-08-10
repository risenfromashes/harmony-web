<script lang="ts">
  import EventItem from "../lib/eventitem.svelte";
  import Drawer from "../lib/drawer.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  let current_time = new Date();

  console.log(current_time);
  //declare an array of 10 objects with title, start time (js date time format), end time (js date time format), description
  //Remember, January is 0, not 1
  let events = [
    {
      title: "CSE216 Project Evaluation 2",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 3,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 10, 14, 0),
      description:
        "This is the second evaluation for the database project. In this assessment, you are expected to show significant improvement over what you showed three weeks back, else you will be disqualified. So, we expect that you will be able to show significant improvement over the previous evaluation.",
    },
    {
      title: "CSE215 Class Test 2",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 3,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 10, 8, 15),
      description:
        "The third and last class test of the database course is here. Syllabus: First four slides.",
    },
    {
      title: "EEE269 Class Test 3",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 5,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 20, 10, 0),
      description:
        "Syllabus: DC and Induction Motor. Study hard, or else EEE will make you suffer.",
    },
    {
      title: "CSE216 Lab Quiz",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 7,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 17, 14, 30),
      description: "The mighty lab quiz of CSE216 is here.",
    },
    {
      title: "MATH245 Class Test 4",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 7,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 14, 11, 0),
      description:
        "Class Test on Laplace Analysis, everything that Nilufar Madam has covered until now.",
    },
    {
      title: "MATH245 Class Test 5",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 7,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 21, 11, 0),
      description:
        "Class Test on Fourier Analysis, everything that Eliyas Sir has covered until now.",
    },
    {
      title: "CSE207 Class Test 4",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 7,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 13, 8, 0),
      description: "Syllabus: Splay Tree, Hashtable.",
    },
    {
      title: "CSE211 Class Test 4",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 8,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 17, 8, 0),
      description: "Syllabus: Turing Machine",
    },
    {
      title: "CSE208 Online Evaluation",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 8,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 17, 11, 0),
      description: "Online on NP-complete problems.",
    },
    {
      title: "CSE208 Offline Assignment",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 8,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 24, 11, 0),
      description: "Offline on Branching and Approximation Algorithms.",
    },
    {
      title: "CSE216 Final Project Evaluation",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 3,
        current_time.getMinutes()
      ),
      end_time: new Date(2022, 7, 10, 31, 0),
      description: "The final and grand evaluation of the Database Project.",
    },
  ];

  //sort the events based on end time, and then start time
  events.sort((a, b) => {
    if (a.end_time > b.end_time) {
      return 1;
    } else if (a.end_time < b.end_time) {
      return -1;
    } else {
      if (a.start_time > b.start_time) {
        return 1;
      } else if (a.start_time < b.start_time) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  let showable_events = events;

  //write a function to convert a string (YYYY-MM-DD) to a Date object
  function stringToDate(date_string, h, m) {
    let date_array = date_string.split("-");
    return new Date(date_array[0], date_array[1] - 1, date_array[2], h, m);
  }

  function search() {
    if (start_date != "" && end_date != "") {
      //filter events based on whether they are in the range of start_date and end_date
      // console.log(start_date, stringToDate(start_date, 0, 0));
      // console.log(end_date, stringToDate(end_date, 23, 59));
      showable_events = events.filter((event) => {
        return (
          event.end_time >= stringToDate(start_date, 0, 0) &&
          event.end_time <= stringToDate(end_date, 23, 59)
        );
      });
    } else showable_events = events;
  }

  let start_date = "";
  let end_date = "";

  // $: if (start_date) console.log(start_date);
  let draweropen: boolean = false;
</script>

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 pt-20 pb-10 pl-20 pr-20 mt-5">
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
          bind:value={start_date}
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
          bind:value={end_date}
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
        start_date = "";
        end_date = "";
        showable_events = events;
      }}>Reset</button
    >
    <!-- drawer init and show -->
    <!-- <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg lg:ml-40 ml-10 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      data-drawer-target="drawer-form"
      data-drawer-show="drawer-form"
      aria-controls="drawer-form"
      on:click|stopPropagation={() => (draweropen = !draweropen)}
    >
      <FaIcon type="regular" icon="plus" />
      Create New Event
    </button> -->

    <!-- Add Event Button v2 -->
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
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {#each showable_events as e}
        <EventItem event={e} {current_time} />
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
        >New event
      </h5>
      <form action="#" class="mb-6">
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
          />
        </div>
        <button
          type="submit"
          class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
          > Create event</button
        >
      </form>
    </div>
  </Drawer>
</div>
