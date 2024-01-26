<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";
  import FaIcon from "./faIcon.svelte";
  import Comment from "./comment.svelte";
  import { addPost, type Post } from "./data/posts";
  import Avatar from "./avatar.svelte";
  import { onMount } from "svelte";
  import { renderDelta, type QlDelta } from "./utilities/qlDeltaRenderer";
  import { current_user } from "./stores/user";
  import { current_group, current_subject } from "./stores/groups";

  export let post: Post;
  export let time = ""; //when it was posted
  let text = "";

  let showComments = false;

  // $: showCommentStatement = showComments ? "Hide Comments" : "Show Comments";

  let postContent: HTMLDivElement;
  onMount(() => {
    console.log(post.content.data);
    if (post.content.type == "text") {
      postContent.textContent = post.content.data as string;
    } else {
      renderDelta(postContent, JSON.parse(post.content.data) as QlDelta);
    }
  });

  function toggleComments() {
    showComments = !showComments;
  }

  const submitComment = async () => {
    try {
      let pid = await addPost({
        poster_id: current_user.user_id,
        subject_id: $current_subject.id,
        group_id: $current_group.id,
        parent_post_id: post.id,
        type: "text",
        content: text,
      });
      text = "";
    } catch (e) {
      console.log(e);
      // todo show error
    }
  };

  let commentsCount = post.comments.length;
  $: commentsCount = post.comments.length;
</script>

<div class="w-8/12 flex flex-col">
  <div
    class="w-full min-h-[5rem] h-auto flex flex-col mb-4 py-3 px-6 rounded-xl bg-slate-800 shadow-xl flex-shrink-0"
    in:scale={{ duration: 300 }}
  >
    <div class="flex mb-4 w-full">
      <Avatar dp={post.poster_dp_link} name={post.poster_name} />

      <div class="p-2 w-full">
        <h5 class="font-semibold text-lg mb-2">
          {post.poster_name}
          <span class="ml-2 font-semibold text-sm text-slate-600">{time}</span>
        </h5>
        <div class="flex flex-col flex-1 w-full">
          <div bind:this={postContent} />
        </div>
      </div>
    </div>

    <div class="w-full flex justify-between">
      <button
        type="button"
        class="font-semibold text-gray-400 transition-all hover:text-gray-200"
        on:click={toggleComments}
      >
        {commentsCount}
        {commentsCount > 1 ? "Comments" : "Comment"}
      </button>
    </div>
  </div>

  {#if showComments}
    <div
      class="w-full h-auto flex flex-col mb-4 py-3 px-6 rounded-lg bg-slate-800 shadow-xl flex-shrink-0 relative overflow-hidden"
      transition:slide|local={{ duration: 300 }}
    >
      <p class="font-semibold text-xl p-3">Comments</p>

      <div>
        {#if commentsCount > 0}
          {#each post.comments as comment}
            <Comment {comment} />
          {/each}
        {:else}
          <p class="text-md px-3 py-4 text-gray-500 font-medium">
            <FaIcon icon="ban" />&nbsp;&nbsp;No comments to show!
          </p>
        {/if}

        <div
          class="w-full min-h-[5rem] flex justify-evenly item-center mt-4 p-2 rounded-xl bg-slate-800 flex-shrink-0"
        >
          <input
            type="text"
            placeholder="Type a post comment..."
            bind:value={text}
            class="w-11/12 h-12 px-4 bg-slate-900 rounded-lg outline-none"
          />

          <button
            type="button"
            class="font-semibold text-gray-400 h-12 w-20 ml-4 transition-all outline-none hover:text-emerald-400"
            on:click={submitComment}
          >
            <FaIcon icon="paper-plane" />&nbsp;&nbsp;Reply
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
