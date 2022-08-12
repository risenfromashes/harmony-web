<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import FaIcon from "./faIcon.svelte";

  const location = useLocation();

  $: query = new URLSearchParams($location.search);
</script>

<div class="h-full w-10/12">
  {#if $location.search.length > 0}
    <!-- Chat Viewer -->
    <div class="h-5/6 w-full px-10 py-8 border-b border-slate-700" />

    <!-- Chatbox -->
    <div class="h-1/6 w-full flex justify-center items-center">
      <textarea
        class="resize-none w-5/6 max-h-[4rem] overflow-y-scroll bg-slate-800 px-4 py-3 rounded-lg mr-4 overflow-x-hidden"
        placeholder="Type your message here... (Markdown supported)"
      />

      <button
        type="button"
        class="flex bg-slate-800 px-6 py-4 rounded-lg transition-all hover:bg-slate-700"
      >
        <FaIcon icon="paper-plane" />
        <p class="ml-3">Send</p>
      </button>
    </div>
  {:else}
    <div class="h-full w-full flex flex-col items-center justify-center">
      <p class="text-2xl text-slate-700">
        Select a group and channel to view the chat.
      </p>
      <FaIcon icon="bolt" className="text-[20rem] text-slate-800" />
    </div>
  {/if}
</div>
