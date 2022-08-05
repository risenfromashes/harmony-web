<script>
  //declare an array of 3 objects with id class, area_expanded
  let questions = [
    {
      id: "0",
      area_expanded: true,
      class: "",
      statement: "What is Harmony?",
      answer:
        '<p class="mb-2 text-gray-500 dark:text-gray-400">Harmony is a social network for students to collaborate each other. It is a place where students can share their knowledge and experience and also can discuss the topics that they are interested in. We expect Harmony to be the hub of the students’ academic enthusiasm and excellence.</p><p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and join a collaborative environment as good as Harmony.</p>',
    },
    {
      id: "1",
      area_expanded: false,
      class: "hidden",
      statement: "Who can join Harmony?",
    },
    {
      id: "2",
      area_expanded: false,
      class: "hidden",
      statement: "What are the differences between Harmony and Moodle?",
    },
  ];
  function toggle(id) {
    questions[id].area_expanded = !questions[id].area_expanded;
    questions[id].class = questions[id].area_expanded ? "" : "hidden";
  }
</script>

<div id="accordion-open" data-accordion="open">
  {#each questions as q}
    <h2 id="accordion-open-heading-1">
      <button
        type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        data-accordion-target="#accordion-open-body-1"
        aria-expanded={questions[q.id].area_expanded}
        aria-controls="accordion-open-body-1"
        on:click={() => toggle(0)}
      >
        <span class="flex items-center"
          ><svg
            class="w-5 h-5 mr-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            /></svg
          >
          {questions[q.id].statement}</span
        >
        <svg
          data-accordion-icon=""
          class="w-6 h-6 rotate-180 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </button>
    </h2>

    <div
      id="accordion-open-body-1"
      class={questions[q.id].class}
      aria-labelledby="accordion-open-heading-1"
    >
      <div
        class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
      >
        {@html questions[q.id].answer}
      </div>
    </div>
  {/each}
</div>
