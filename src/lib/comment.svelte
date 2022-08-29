<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";
  import FaIcon from "./faIcon.svelte";
  import { addPost, type Post } from "./data/posts";
  import Avatar from "./avatar.svelte";
  import { current_user } from "./stores/user";
  import { current_group, current_subject } from "./stores/groups";
  import { afterUpdate, beforeUpdate } from "svelte";

  export let comment: Post;

  let text = "";

  let showSubcomments = false;
  let showReplyChatbox = false;

  function toggleSubComments() {
    showSubcomments = !showSubcomments;
  }

  function toggleReplyChatbox() {
    showReplyChatbox = !showReplyChatbox;
  }

  let lastCount = comment.comments.length;
  afterUpdate(() => {
    if (comment.comments.length > lastCount) {
      showSubcomments = true;
      lastCount = comment.comments.length;
    }
  });

  const submitComment = async () => {
    try {
      let pid = await addPost({
        poster_id: current_user.user_id,
        subject_id: $current_subject.id,
        group_id: $current_group.id,
        parent_post_id: comment.id,
        type: "text",
        content: text,
      });
      text = "";
    } catch (e) {
      console.log(e);
      // todo show error
    }
  };
</script>

<div
  class="flex flex-1 flex-col pl-4 pt-2 bg-slate-800 flex-shrink-0"
  in:fly|local={{ duration: 400, x: 100, delay: 200 }}
>
  <div class="flex w-full">
    <div
      class="w-14 h-14 border border-slate-600 rounded-full overflow-hidden flex justify-center items-center mr-4 flex-shrink-0"
    >
      <Avatar dp={comment.poster_dp_link} name={comment.poster_name} />
    </div>

    <div class="p-2 w-full">
      <div class="flex flex-1 items-center justify-between">
        <p class="font-semibold text-lg mb-2">
          {comment.poster_name}
          <span class="ml-2 font-semibold text-sm text-slate-600"
            >{formatRelative(new Date(comment.time), new Date()).replace(
              "t",
              "T"
            )}</span
          >
        </p>

        <div class="flex items-center">
          <!-- Reply -->
          {#if comment.comments.length > 0}
            <button
              type="button"
              class="font-semibold text-gray-400 transition-all hover:text-gray-200 mr-4"
              on:click={toggleSubComments}
            >
              {comment.comments.length}
              {comment.comments.length > 1 ? "Replies" : "Reply"}
            </button>
          {/if}

          <button
            type="button"
            class="h-6 w-6 flex items-center justify-center {showReplyChatbox
              ? 'text-slate-400'
              : 'text-slate-500 hover:text-slate-400'}"
            on:click={toggleReplyChatbox}
          >
            <FaIcon icon="reply" />
          </button>
        </div>
      </div>

      <div class="flex flex-col flex-1">
        <p>{comment.content.data}</p>
      </div>
    </div>
  </div>

  <!-- Subcomments drawer -->
  {#if showSubcomments}
    <div
      class="ml-6 flex flex-col border-l border-slate-600"
      transition:slide|local={{
        duration: 300,
      }}
    >
      {#each comment.comments as subc}
        <svelte:self comment={subc} />
      {/each}
    </div>
  {/if}

  {#if showReplyChatbox}
    <div
      class="w-full h-[5rem] flex justify-evenly item-center mt-2 p-2 rounded-xl bg-slate-800 flex-shrink-0"
      transition:slide|local={{
        duration: 200,
      }}
      on:click|stopPropagation
    >
      <input
        type="text"
        placeholder="Type a reply comment..."
        class="w-11/12 h-12 px-4 bg-slate-900 rounded-lg outline-none"
        bind:value={text}
      />

      <button
        type="button"
        class="font-semibold text-gray-400 h-12 w-20 ml-4 transition-all outline-none hover:text-emerald-400"
        on:click={submitComment}
      >
        <FaIcon icon="paper-plane" />&nbsp;&nbsp;Reply
      </button>
    </div>
  {/if}
</div>
