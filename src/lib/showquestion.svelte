<script lang="ts">
  import type { Question } from "./data/question";
  import ShowAnswer from "./showanswer.svelte";
  import { slide } from "svelte/transition";

  let isanswerexpanded: boolean = false;
  export let question: Question;
</script>

<div class="py-3 bg-gray-800 rounded-lg my-5 pl-7 pr-3 font-Oxygen">
  <div
    class="hover:bg-gray-700 hover:cursor-pointer rounded-lg py-3 px-3"
    on:click={() => {
      isanswerexpanded = !isanswerexpanded;
    }}
  >
    {question.question_body}
  </div>
  {#if isanswerexpanded}
    <div class="ml-4 mr-3" transition:slide|local>
      {#each question.answers as ans}
        <ShowAnswer {ans} />
      {/each}
    </div>
  {/if}
</div>
