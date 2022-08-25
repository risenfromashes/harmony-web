<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";
  import FaIcon from "./faIcon.svelte";

  export let comment: CommentReply;

  let showSubcomments = false;

  function toggleSubComments() {
    showSubcomments = !showSubcomments;
  }
</script>

<div
  class="flex flex-1 flex-col pl-4 pt-2 bg-slate-800 flex-shrink-0"
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

        <button type="button" class="text-slate-500 hover:text-slate-400">
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
      class="ml-8 flex flex-col border-l border-slate-600"
      transition:slide|local={{
        duration: 300,
      }}
    >
      {#each comment.subcomments as subc}
        <!-- <div class="flex border-t border-slate-600 py-2">
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

          <div class="p-2">
            <h5 class="font-semibold text-lg mb-2">
              {comment.commenter_name}
              <span class="ml-2 font-semibold text-sm text-slate-600"
                >{formatRelative(new Date(comment.time), new Date()).replace(
                  "t",
                  "T"
                )}</span
              >
            </h5>
            <div class="flex flex-col flex-1">
              <p>{comment.text}</p>
            </div>
          </div>
        </div> -->
        <svelte:self comment={subc} />
      {/each}
    </div>
  {/if}
</div>
