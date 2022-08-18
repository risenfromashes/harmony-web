<script lang="ts">
  import { navigate, useLocation } from "svelte-navigator";
  import Chat from "./chat.svelte";
  import { getGroupMessages, type Message } from "./data/messages";
  import FaIcon from "./faIcon.svelte";
  import { login } from "./stores/login";
  import { current_group, current_subject } from "./stores/groups";
  import About from "../routes/about.svelte";

  const location = useLocation();

  let messages: Message[] = [];

  const loadGroupMessages = async (gid: string, sid: string) => {
    try {
      messages = await getGroupMessages(gid, sid);
    } catch (e) {
      if (e.message == "Unauthorized") {
        navigate("/login");
      } else {
        console.log(e.message);
      }
    }
  };

  let loadPromise: Promise<void>;
  $: {
    if ($current_group && $current_subject) {
      loadPromise = loadGroupMessages($current_group.id, $current_subject.id);
    }
  }
</script>

<div class="h-full w-10/12">
  <!-- Chat Viewer -->
  <div class="h-5/6 w-full px-10 py-8 border-b border-slate-700">
    {#await loadPromise}
      <p class="mx-auto mt-2">Loading...</p>
    {:then}
      {#each messages as message}
        <Chat
          poster={message.sender_name}
          post={message.content}
          time={message.time.toDateString()}
        />
      {/each}
    {/await}
  </div>

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
</div>
