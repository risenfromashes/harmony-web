<script lang="ts">
  import type { Answer } from "./data/answer";
  import FaIcon from "./faIcon.svelte";
  import { slide } from "svelte/transition";

  export let ans: Answer;

  let isexpanded: boolean = false;
</script>

<div class="py-3 pl-1 bg-gray-700 rounded-lg my-5 pr-3 font-Oxygen flex">
  <div class="px-1 flex-none basis-16">
    <div class="grid grid-cols-1 mx-auto">
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
        <FaIcon type="regular" icon="angle-up" className="text-4xl" />
      </button>
      <div class="text-2xl text-justify mx-auto">
        {ans.upvote}
      </div>
      <button
        class="hover:text-red-400"
        type="button"
        data-drawer-target="drawer-form"
        data-drawer-show="drawer-form"
        aria-controls="drawer-form"
        on:click={() => {
          if (!ans.upvoted) {
            ans.upvote--;
            ans.upvoted = true;
          }
        }}
      >
        <FaIcon type="regular" icon="angle-down" className="text-4xl" />
      </button>
    </div>
  </div>
  <div class="w-full pr-5 pl-2">
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
</div>
