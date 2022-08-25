<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";
  import FaIcon from "./faIcon.svelte";

  export let comment: CommentReply;

  let showSubcomments = false;
  let showReplyChatbox = false;

  function toggleSubComments() {
    showSubcomments = !showSubcomments;
  }

  function toggleReplyChatbox() {
    showReplyChatbox = !showReplyChatbox;
  }
</script>

<div
  class="flex flex-1 flex-col pl-4 pt-2 bg-slate-800 flex-shrink-0 cursor-pointer"
  in:fly={{ duration: 400, x: 100, delay: 200 }}
  on:click|stopPropagation={toggleSubComments}
>
  <div class="flex w-full">
    <div
      class="w-14 h-14 border border-slate-600 rounded-full overflow-hidden flex justify-center items-center mr-4 flex-shrink-0"
    >
      <img
        src="https://www.gravatar.com/avatar/{comment.commenter_name
          .length}?s=47&d=robohash"
        alt={comment.commenter_name}
        class="object-cover w-full h-full"
      />
    </div>

    <div class="p-2 w-full">
      <div class="flex flex-1 items-center justify-between">
        <p class="font-semibold text-lg mb-2">
          {comment.commenter_name}
          <span class="ml-2 font-semibold text-sm text-slate-600"
            >{formatRelative(new Date(comment.time), new Date()).replace(
              "t",
              "T"
            )}</span
          >
        </p>

        <button
          type="button"
          class="h-6 w-6 flex items-center justify-center {showReplyChatbox
            ? 'text-slate-400'
            : 'text-slate-500 hover:text-slate-400'}"
          on:click|stopPropagation={toggleReplyChatbox}
        >
          <FaIcon icon="reply" />
        </button>
      </div>

      <div class="flex flex-col flex-1">
        <p>{comment.text}</p>
      </div>
    </div>
  </div>

  {#if showSubcomments}
    <div
      class="ml-6 flex flex-col border-l border-slate-600"
      transition:slide|local={{
        duration: 300,
      }}
    >
      {#each comment.subcomments as subc}
        <svelte:self comment={subc} />
      {/each}
    </div>
  {/if}

  {#if showReplyChatbox}
    <div
      class="w-full h-[5rem] flex justify-evenly item-center mt-2 p-2 rounded-xl bg-slate-800 flex-shrink-0"
      transition:slide|local={{
        duration: 200,
      }}
      on:click|stopPropagation
    >
      <input
        type="text"
        placeholder="Type a reply comment..."
        class="w-11/12 h-12 px-4 bg-slate-900 rounded-lg outline-none"
      />

      <button
        type="button"
        class="font-semibold text-gray-400 h-12 w-20 ml-4 transition-all outline-none hover:text-emerald-400"
      >
        <FaIcon icon="paper-plane" />&nbsp;&nbsp;Reply
      </button>
    </div>
  {/if}
</div>
