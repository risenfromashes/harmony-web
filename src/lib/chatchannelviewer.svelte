<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import { scale } from "svelte/transition";
  import Chat from "./chat.svelte";
  import FaIcon from "./faIcon.svelte";
  import Quill from "./quill.svelte";

  const location = useLocation();

  $: query = new URLSearchParams($location.search);

  let showEditor = false;

  let newPostContent = {
    delta: {},
    text: "",
  };

  let onTextChange = (e: any) => {
    console.log(e.detail);
    if (showEditor) {
      newPostContent = e.detail;
    }
  };
</script>

<div class="h-full w-10/12 relative">
  {#if $location.search.length > 0}
    <!-- Chat Writer -->
    {#if showEditor}
      <div
        class="absolute h-full w-full bg-[#0005] flex justify-center items-center z-20"
      >
        <div
          class="h-5/6 w-7/12 rounded-2xl flex flex-col shadow-xl border bg-slate-800 border-slate-600 overflow-hidden"
          in:scale={{ duration: 300 }}
        >
          <div
            class="w-full h-1/6 flex items-center justify-between px-10 bg-slate-800 border-b border-slate-600 relative"
          >
            <p class="font-bold text-3xl mr-4">
              <FaIcon icon="file-pen" />&nbsp;&nbsp;Create Post
            </p>

            <button
              type="button"
              class="flex justify-center items-center mx-4 my-2 hover:text-rose-400"
              on:click={() => {
                showEditor = false;
              }}
              ><p class="font-bold text-3xl h-full w-full transition-all">
                <FaIcon icon="times" />
              </p></button
            >
          </div>

          <!-- <textarea
        class="h-4/6 w-full px-6 py-8 resize-none bg-slate-700 focus:outline-none"
        placeholder="What's in you mind, Ashraf?"
        bind:value={newPostContent}
      /> -->

          <Quill className="h-4/6 w-full" on:textChange={onTextChange} />

          <div
            class="w-full h-1/6 flex items-center justify-center border-t border-slate-600 bg-slate-800"
          >
            <button
              type="button"
              class="resize-none rounded-lg font-semibold text-xl transition-all outline-none hover:text-emerald-400"
              ><FaIcon icon="paper-plane" />&nbsp;&nbsp;Send</button
            >
          </div>
        </div>
      </div>
    {/if}

    <!-- Chat Viewer -->
    <div
      class="h-full w-full px-10 py-8 flex flex-col items-center overflow-y-scroll overflow-x-hidden"
    >
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Ashraf" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Siam" time={Date()} post={`sadasfsdfasdf`} />
      <Chat poster="Sadat" time={Date()} post={`sadasfsdfasdf`} />
    </div>

    <!-- Floating Button -->
    <button
      type="button"
      class="absolute bottom-20 right-20 bg-blue-600 w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center transition-all hover:bg-blue-700"
      on:click={() => {
        showEditor = true;
      }}
    >
      <FaIcon icon="comment-dots" className="text-white text-2xl" />
    </button>
  {:else}
    <div class="h-full w-full flex flex-col items-center justify-center">
      <p class="text-2xl text-slate-700">
        Select a group and channel to view the chat.
      </p>
      <FaIcon icon="bolt" className="text-[20rem] text-slate-800" />
    </div>
  {/if}
</div>
