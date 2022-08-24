<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";

  export let comment: CommentReply;
</script>

<div
  class="w-11/12 min-h-[5rem] flex flex-col mb-4 p-2 border-y border-slate-600 bg-slate-800 flex-shrink-0"
  in:fly={{ duration: 400, x: -100, delay: 200 }}
>
  <div class="flex">
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
  </div>
</div>
