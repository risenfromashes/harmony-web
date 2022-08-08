<script lang="ts">
  import EventItem from "../lib/eventitem.svelte";
  let current_time = new Date();
  console.log(current_time);
  //declare an array of 10 objects with title, start time (js date time format), end time (js date time format), description
  let events = [
    {
      title: "Event 1",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 1,
        current_time.getMinutes()
      ),
      end_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 2,
        current_time.getMinutes()
      ),
      description: "This is event 1",
    },
    {
      title: "Event 2",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 3,
        current_time.getMinutes()
      ),
      end_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 4,
        current_time.getMinutes()
      ),
      description: "This is event 2",
    },
    {
      title: "Event 3",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 5,
        current_time.getMinutes()
      ),
      end_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 6,
        current_time.getMinutes()
      ),
      description: "This is event 3",
    },
    {
      title: "Event 4",
      start_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 7,
        current_time.getMinutes()
      ),
      end_time: new Date(
        current_time.getFullYear(),
        current_time.getMonth(),
        current_time.getDate(),
        current_time.getHours() + 8,
        current_time.getMinutes()
      ),
      description: "This is event 4",
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
</script>

<div class="flex place-content-center">
  <ol class="relative border-l border-gray-200 dark:border-gray-700 pt-20 px-5">
    {#each events as e}
      <li class="mb-10 ml-6" />
      <EventItem event={e} {current_time} />
    {/each}
  </ol>
</div>
