<script lang="ts">
  import FaIcon from "./faIcon.svelte";
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  export let current_time: Date;
  export let event: {
    title: string;
    start_time: Date;
    end_time: Date;
    description: string;
  };

  let urgent: boolean;
  console.log(current_time);
  console.log(event.end_time);
  if (
    event.end_time.getTime() - current_time.getTime() <=
    1000 * 60 * 60 * 24 * 2
  ) {
    urgent = true;
  } else {
    urgent = false;
  }

  function remainingDays(date: Date) {
    let diff = date.getTime() - current_time.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(days);
    return days;
  }
  let daysLeft = remainingDays(event.end_time);

  function getDateTime(date: Date) {
    return (
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
      " " +
      `${date.getHours()}:${date.getMinutes()}`
    );
  }
  //write a function that will take a JavaScript Date and will return something in the format like 11 August, 11:59 PM, converting time to AM, PM
  function getTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let h: string;
    let m: string;
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    h = hours ? hours.toString() : "12"; // the hour '0' should be '12'
    m = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let strTime = h + ":" + m + " " + ampm;
    return strTime;
  }
  function getDateTimeString(date: Date) {
    return `${date.getDate()} ${month[date.getMonth()]}` + ", " + getTime(date);
  }
</script>

<li class="mb-10 ml-6">
  <span
    class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
  >
    <FaIcon type="regular" icon="calendar-check" />
  </span>

  {#if daysLeft <= 1}
    <h3
      class="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white font-JosefinSans"
    >
      {event.title}
      <span
        class="bg-red-100 text-red-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-300 dark:text-red-900 ml-3"
        >Approaching</span
      >
    </h3>
    <time
      class="block mb-2 text-base leading-none text-gray-400 dark:text-gray-500"
      >{getDateTimeString(event.end_time)}</time
    >
  {:else if daysLeft <= 7}
    <h3
      class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white font-JosefinSans"
    >
      {event.title}
      <span
        class="bg-green-100 text-green-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-300 dark:text-green-900 ml-3"
        >This Week</span
      >
    </h3>
    <time
      class="block mb-2 text-base leading-none text-gray-400 dark:text-gray-500"
      >{getDateTimeString(event.end_time)}</time
    >
  {:else}
    <h3
      class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white font-JosefinSans"
    >
      {event.title}
    </h3>
    <time
      class="block mb-2 text-base leading-none text-gray-400 dark:text-gray-500"
      >{getDateTimeString(event.end_time)}</time
    >
  {/if}
  <p class="mb-4 text-base font-Oxygen text-gray-500 dark:text-gray-400">
    {event.description}
  </p>
</li>
