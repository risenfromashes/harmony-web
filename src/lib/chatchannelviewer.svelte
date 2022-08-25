<script lang="ts">
  import { navigate, useLocation } from "svelte-navigator";
  import Chat from "./chat.svelte";
  import {
    getGroupMessages,
    postGroupMessage,
    type Message,
  } from "./data/messages";
  import FaIcon from "./faIcon.svelte";
  import { login } from "./stores/login";
  import { current_group, current_subject } from "./stores/groups";
  import About from "../routes/about.svelte";
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { notifyTarget } from "./events/notifytarget";

  const location = useLocation();

  let chatScroll: HTMLDivElement;

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

  afterUpdate(() => {
    if (chatScroll) {
      chatScroll.scrollTo(0, chatScroll.scrollHeight);
    }
  });

  onMount(() => {
    notifyTarget.addEventListener("group-message", handleNewMessage);
  });

  onDestroy(() => {
    notifyTarget.removeEventListener("group-message", handleNewMessage);
  });

  let messages: Message[] = [];

  let editText: string;

  let handlePost = async () => {
    try {
      let mid = await postGroupMessage({
        content: editText,
        group_id: $current_group.id,
        subject_id: $current_subject.id,
      });
      editText = "";
    } catch (e) {
      //TODO: show alert
      console.log(e);
    }
  };

  let loadPromise: Promise<void>;
  $: {
    if ($current_group && $current_subject) {
      loadPromise = loadGroupMessages($current_group.id, $current_subject.id);
    }
  }

  const handleNewMessage = (e) => {
    console.log("Got group message event...");
    let msg: Message = e.detail;
    messages = [...messages, msg];
  };

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
      handlePost();
    }
  };
</script>

<div class="h-full w-10/12">
  <!-- Chat Viewer -->
  {#await loadPromise}
    <p class="mx-auto mt-2">Loading...</p>
  {:then}
    <div
      bind:this={chatScroll}
      class="h-5/6 w-full px-10 py-8 border-b border-slate-700 overflow-y-scroll"
    >
      {#each messages as message}
        <Chat
          poster={message.sender_name}
          post={message.content}
          time={message.time.toDateString()}
        />
      {/each}
    </div>
  {/await}

  <!-- Chatbox -->
  <div class="h-1/6 w-full flex justify-center items-center">
    <textarea
      class="resize-none w-5/6 max-h-[4rem] overflow-y-scroll bg-slate-800 px-4 py-3 rounded-lg mr-4 overflow-x-hidden"
      placeholder="Type your message here... (Markdown supported)"
      bind:value={editText}
      on:keydown={keyDown}
    />
    <button
      type="button"
      class="flex bg-slate-800 px-6 py-4 rounded-lg transition-all hover:bg-slate-700"
      on:click={handlePost}
    >
      <FaIcon icon="paper-plane" />
      <p class="ml-3">Send</p>
    </button>
  </div>
</div>
