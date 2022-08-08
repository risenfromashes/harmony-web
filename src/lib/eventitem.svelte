<script lang="ts">
  import FaIcon from "./faIcon.svelte";
  export let current_time: Date;
  export let event: {
    title: string;
    start_time: Date;
    end_time: Date;
    description: string;
  };

  let today: boolean;

  if (
    current_time.getDate() == event.end_time.getDate() &&
    current_time.getMonth() == event.end_time.getMonth() &&
    current_time.getFullYear() == event.end_time.getFullYear()
  ) {
    today = true;
  } else {
    today = false;
  }

  function getDateTime(date: Date) {
    return (
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
      " " +
      `${date.getHours()}:${date.getMinutes()}`
    );
  }
</script>

<li class="mb-10 ml-6">
  <span
    class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
  >
    <FaIcon type="regular" icon="calendar-check" />
  </span>
  <h3
    class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white font-Noto"
  >
    {event.title}
    {#if today}
      <span
        class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 ml-3"
        >Deadline Approaching</span
      >
    {/if}
  </h3>
  <time
    class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
    >{getDateTime(event.start_time)} to {getDateTime(event.end_time)}</time
  >
  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    {event.description}
  </p>
</li>
