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
</script>

<div class="bg-slate-900 pt-20 pb-10 pl-20 pr-20 mt-5">
  <div class="flex place-content-left">
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      {#each events as e}
        <EventItem event={e} {current_time} />
      {/each}
    </ol>
  </div>
</div>
