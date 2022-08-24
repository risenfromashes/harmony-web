<script lang="ts">
  import ShowQuestion from "../lib/showquestion.svelte";
  import type { Question } from "../lib/data/question";

  let questions: Array<Question> = [
    {
      questionid: "1",
      statement:
        "Design a Turing Machine for recognizing strings of the form wcw",
      question_type: "Term Final",
      question_year: "2019-20",
      answers: [
        {
          answerid: "1",
          short_answer: "Cant' answer",
          answer_text: "I can't answer, sorry sir.",
          questionid: "1",
          image_links: [],
          upvote: 69,
          author: "Siam",
          voted: 0,
        },
        {
          answerid: "2",
          short_answer: "Can answer",
          answer_text:
            'But I can sir. The machine operates on an infinite[4] memory tape divided into discrete cells,[5] each of which can hold a single symbol drawn from a finite set of symbols called the alphabet of the machine. It has a "head" that, at any point in the machine\'s operation, is positioned over one of these cells, and a "state" selected from a finite set of states. At each step of its operation, the head reads the symbol in its cell. Then, based on the symbol and the machine\'s own present state, the machine writes a symbol into the same cell, and moves the head one step to the left or the right,[6] or halts the computation. The choice of which replacement symbol to write and which direction to move is based on a finite table that specifies what to do for each combination of the current state and the symbol that is read.',
          questionid: "1",
          image_links: [],
          upvote: 420,
          author: "Lord Ashraf",
          voted: 0,
        },
      ],
    },
  ];
</script>

<div class="bg-slate-900 pt-20 px-5">
  <nav
    class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            /></svg
          >
          Term Final Questions
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            /></svg
          >
          <a
            href="#"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >2019-20</a
          >
        </div>
      </li>
    </ol>
  </nav>
  {#each questions as question}
    <ShowQuestion {question} />
  {/each}
</div>
