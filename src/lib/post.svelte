<script>
  import { scale } from "svelte/transition";
  export let poster = "sadat";
  export let time = "30-07-2022 10:51PM"; //when it was posted
  export let post =
    "Hello world, how are you? My name is Sadat and I want to introduce myself.";
  let showComments = false;

  $: showCommentStatement = showComments ? "Hide Comments" : "Show Comments";
</script>

<div
  class="w-11/12 min-h-[5rem] flex flex-col m-4 py-3 px-6 rounded-xl bg-slate-800 shadow-xl flex-shrink-0"
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
        <p>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi animcupidatat excepteur officia. Reprehenderit
          nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
          minim nulla est proident. Nostrud officia pariatur ut officia. Sit
          irure elit esse ea nulla sunt ex occaecat reprehenderit commodo
          officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa
          proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi animcupidatat excepteur officia. Reprehenderit
          nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
          minim nulla est proident. Nostrud officia pariatur ut officia. Sit
          irure elit esse ea nulla sunt ex occaecat reprehenderit commodo
          officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa
          proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </p>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between">
    <p class="card__comments">
      {showCommentStatement}
    </p>

    <p class="card__date" />
  </div>
</div>
