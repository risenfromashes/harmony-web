<script lang="ts">
  import type { Answer } from "./data/answer";
  import FaIcon from "./faIcon.svelte";
  import { slide } from "svelte/transition";

  export let ans: Answer;

  let isexpanded: boolean = false;
</script>

<div class="py-3 pl-5 bg-gray-700 rounded-lg my-5 pr-3 font-Oxygen">
  <div class="flex justify-end">
    <div class="grid grid-cols-1 mx-5">
      <button
        class="hover:text-green-400"
        type="button"
        data-drawer-target="drawer-form"
        data-drawer-show="drawer-form"
        aria-controls="drawer-form"
        on:click={() => {
          if (!ans.upvoted) {
            ans.upvote++;
            ans.upvoted = true;
          }
        }}
      >
        <FaIcon type="regular" icon="angle-up" className="text-sm" />
      </button>
      <button
        class="hover:text-red-400"
        type="button"
        data-drawer-target="drawer-form"
        data-drawer-show="drawer-form"
        aria-controls="drawer-form"
        on:click={() => {
          if (ans.upvoted) {
            ans.upvote--;
            ans.upvoted = false;
          }
        }}
      >
        <FaIcon type="regular" icon="angle-down" className="text-sm" />
      </button>
    </div>
    <div class="my-auto w-8">
      {ans.upvote}
    </div>
  </div>
  <div
    class="hover:cursor-pointer bg-gray-900 rounded-lg px-4 mt-3 mb-5 py-3"
    on:click={() => (isexpanded = !isexpanded)}
  >
    {ans.short_answer}
  </div>
  {#if isexpanded}
    <div transition:slide>
      {ans.answer_text}
    </div>
  {/if}
  <div class="flex justify-end align-bottom">
    {ans.author}
  </div>
</div>
