<script lang="ts">
  import { scale } from "svelte/transition";
  import { quill } from "svelte-quill";
  import Post from "../lib/post.svelte";
  import FaIcon from "../lib/faIcon.svelte";

  let showEditor = false;
  let showGroupDropdown = false;

  let newPostQlContent = {
    html: "",
    text: "",
  };

  $: {
    console.log(newPostQlContent);
  }

  let qlEditorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block"],
      ],
    },
    placeholder: "What's in you mind, Ashraf?",
    // theme: "snow",
  };

  let onTextChange = (e: any) => {
    newPostQlContent = e.detail;
  };
</script>

<svelte:head>
  <title>Showing Posts</title>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

{#if showEditor}
  <div
    class="fixed h-full w-full bg-[#0005] flex justify-center items-center z-20"
    on:click={() => {
      showEditor = false;
    }}
  >
    <div
      class="h-5/6 w-7/12 rounded-2xl flex flex-col shadow-xl border bg-slate-800 border-slate-600 overflow-hidden"
      in:scale={{ duration: 300 }}
      on:click|stopPropagation
    >
      <div
        class="w-full h-1/6 flex items-center justify-between px-10 bg-slate-800 border-b border-slate-600 relative"
      >
        <div class="flex items-center">
          <p class="font-bold text-3xl mr-4">
            <FaIcon icon="file-pen" />&nbsp;&nbsp;Create Post
          </p>

          <button
            class="bg-slate-700 px-4 py-2 rounded-lg transition-all hover:bg-slate-600"
            on:click={() => {
              showGroupDropdown = !showGroupDropdown;
            }}
            >Select group&nbsp;&nbsp;&nbsp;<FaIcon
              icon="chevron-down"
            /></button
          >
        </div>

        {#if showGroupDropdown}
          <div
            class="flex flex-col items-center min-h-[2rem] w-[280px] bg-slate-800 border border-slate-600 rounded-lg z-20 overflow-hidden"
            style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(281px, 83px);"
          >
            <button
              type="button"
              class="w-full py-4 px-4 transition-all hover:bg-slate-700 text-left"
            >
              Architecture Dor Lage
            </button>
            <button
              type="button"
              class="w-full py-4 px-4 transition-all hover:bg-slate-700 text-left"
            >
              CSE-te Nesha Lagse!
            </button>
            <button
              type="button"
              class="w-full py-4 px-4 transition-all hover:bg-slate-700 text-left"
            >
              আকাইম্মার দল!
            </button>
          </div>
        {/if}

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

      <div
        class="editor"
        use:quill={qlEditorOptions}
        on:text-change={onTextChange}
      />

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

<div
  class="w-full bg-slate-900 flex flex-col justify-start items-center pt-20 pb-10"
>
  <div
    class="w-11/12 min-h-[5rem] flex justify-center mt-10 mb-5 py-4 px-6 rounded-xl bg-slate-800 shadow-xl flex-shrink-0"
    in:scale={{ duration: 300 }}
  >
    <div
      class="w-14 h-14 border border-slate-600 rounded-full overflow-hidden flex justify-center items-center mr-6 flex-shrink-0"
    >
      <img
        src="https://www.gravatar.com/avatar/{'Ashraf'.length}?s=47&d=robohash"
        alt={"current user"}
        class="object-cover w-full h-full"
      />
    </div>

    <button
      type="button"
      class={"w-10/12 h-14 border border-slate-700 rounded-full text-left px-8 cursor-text overflow-hidden flex-shrink-0 whitespace-nowrap" +
        (newPostQlContent.text.trim() ? "  text-white" : " text-gray-400")}
      on:click={() => {
        showEditor = true;
      }}
    >
      {newPostQlContent.text.trim()
        ? newPostQlContent.text.trim()
        : "What's in you mind, Ashraf?"}</button
    >
  </div>

  <Post poster={"Siam"} post={"what the hell this is?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
  <Post poster={"Ashraf"} post={"what am I talking about right now?"} />
</div>

<style>
</style>
