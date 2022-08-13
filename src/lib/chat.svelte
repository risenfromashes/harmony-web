<script>
  import { scale } from "svelte/transition";
  export let poster = "";
  export let time = ""; //when it was posted
  export let post = "";
  // let showComments = false;

  // $: showCommentStatement = showComments ? "Hide Comments" : "Show Comments";
</script>

<div
  class="w-full min-h-[5rem] flex flex-col my-2 py-3 px-6 border-y border-slate-800 flex-shrink-0"
  in:scale={{ duration: 300 }}
>
  <div class="flex mb-4">
    <div
      class="w-14 h-14 border border-slate-600 rounded-full overflow-hidden flex justify-center items-center mr-4 flex-shrink-0"
    >
      <img
        src="https://www.gravatar.com/avatar/{poster.length}?s=47&d=robohash"
        alt={poster}
        class="object-cover w-full h-full"
      />
    </div>

    <div class="p-2">
      <h5 class="font-semibold text-lg mb-2">
        {poster}
        <span class="ml-2 font-semibold text-sm text-slate-600">{time}</span>
      </h5>
      <div class="flex flex-col flex-1">
        <p>{post}</p>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between">
    <!-- <p class="card__comments">
      {showCommentStatement}
    </p> -->

    <p class="reactions" />
  </div>
</div>
