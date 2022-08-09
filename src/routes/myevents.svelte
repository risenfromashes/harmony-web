<script lang="ts">
  import EventItem from "../lib/eventitem.svelte";
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

  $: if (start_date) console.log(start_date);
</script>

<svelte:head>
  <script src="https://unpkg.com/flowbite@1.5.1/dist/datepicker.js"></script>
</svelte:head>

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
  </div>

  <div class="flex place-content-left">
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {#each showable_events as e}
        <EventItem event={e} {current_time} />
      {/each}
    </ol>
  </div>
</div>
