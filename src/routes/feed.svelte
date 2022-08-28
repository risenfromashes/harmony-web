<script lang="ts">
  import { scale } from "svelte/transition";
  import PostItem from "../lib/post.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  import Quill from "../lib/quill.svelte";
  import {
    type Group,
    getGroups,
    loadGroups,
    loadGroupsDev,
  } from "../lib/data/groups";
  import { type Post, getPosts, getPostsDev } from "../lib/data/posts";
  import { groups } from "../lib/stores/groups";
  import { navigate } from "svelte-navigator";

  // import { type QlDelta } from "../lib/utilities/qlDeltaProcessing";
  import { current_user } from "../lib/stores/user";
  import { formatRelative } from "date-fns";
  import Loader from "../lib/loader.svelte";

  let showEditor = false;
  let showGroupDropdown = false;

  let newPostContent = {
    delta: {},
    text: "",
  };

  let posts: Array<Post> = [];
  let selected_group: Group = null;

  let load_groups = loadGroupsDev();
  loadGroups();

  let load_posts = (async () => {
    try {
      posts = await getPostsDev();
    } catch (e) {
      navigate("/login");
      console.log(e);
    }
  })();

  const submit_post = async () => {
    // TODO: show error alerts
    try {
      if (selected_group == null) {
        return;
      }
      if (!current_user.loggedIn) {
        navigate("/");
      }

      let post = {
        user_id: current_user.user_id,
        group_id: selected_group.id.toString(),
        text: newPostContent.text.toString(),
      };

      console.log({ post });

      let res = await fetch("/post", {
        method: "POST",
        body: JSON.stringify(post),
      });

      if (res.ok) {
        showEditor = false;
        navigate("/");
      } else {
        console.log(res);
      }
    } catch (e) {}
  };

  let onTextChange = (e: any) => {
    console.log(e.detail);
    if (showEditor) {
      newPostContent = e.detail;
    }
  };
</script>

<svelte:head>
  <title>Showing Posts</title>
</svelte:head>

{#if false}
  <div
    class="fixed h-full w-full bg-[#0005] flex justify-center items-center z-20"
  >
    <div
      class="h-5/6 w-7/12 rounded-2xl flex flex-col shadow-xl border bg-slate-800 border-slate-600 overflow-hidden mx-auto"
      in:scale={{ duration: 300 }}
    >
      <div
        class="w-full h-1/6 flex items-center justify-between px-10 bg-slate-800 border-b border-slate-600 relative"
      >
        <div class="flex items-center">
          <p class="font-bold text-3xl mr-4">
            <FaIcon icon="file-pen" />&nbsp;&nbsp;Create Post
          </p>
        </div>

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

      <Quill
        className="h-4/6 w-full bg-slate-900"
        on:textChange={onTextChange}
      />

      <div
        class="w-full h-1/6 flex items-center justify-center border-t border-slate-600 bg-slate-800"
      >
        <button
          type="button"
          class="resize-none rounded-lg font-semibold text-xl transition-all outline-none hover:text-emerald-400"
          on:click={submit_post}
          ><FaIcon icon="paper-plane" />&nbsp;&nbsp;Send</button
        >
      </div>
    </div>
  </div>
{/if}

<div
  class="w-full bg-slate-900 flex flex-col justify-start items-center py-5 min-h-screen"
>
  <div
    class="w-8/12 min-h-[5rem] flex justify-center mt-10 mb-5 py-4 px-6 rounded-xl bg-slate-800 shadow-xl flex-shrink-0"
    in:scale|local={{ duration: 300 }}
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
    {#if !showEditor}
      <button
        type="button"
        class={"bg-slate-900 flex flex-1 items-center border border-slate-700 rounded-lg text-left px-4 cursor-text overflow-hidden flex-shrink-0 whitespace-nowrap" +
          (newPostContent.text.trim() ? "  text-white" : " text-gray-400")}
        on:click={() => {
          showEditor = true;
        }}
      >
        {newPostContent.text.trim()
          ? newPostContent.text.trim()
          : "What's in you mind?"}
      </button>
    {:else}
      <Quill className="h-4/6 w-full" on:textChange={onTextChange} />
      <div
        class="w-auto h-1/6 flex items-center justify-center border-t border-slate-600 bg-slate-800"
      >
        <button
          type="button"
          class="resize-none rounded-lg font-semibold text-xl transition-all outline-none hover:text-emerald-400"
          on:click={submit_post}
          ><FaIcon icon="paper-plane" />&nbsp;&nbsp;Send</button
        >
      </div>
    {/if}
  </div>

  {#await load_posts}
    <Loader />
  {:then}
    {#each posts as post}
      <PostItem
        poster={post.poster_name}
        post={post.text}
        time={formatRelative(new Date(post.time), new Date()).replace("t", "T")}
      />
    {/each}
  {/await}
</div>
