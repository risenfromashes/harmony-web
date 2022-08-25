<script lang="ts">
  import { scale, slide, fly } from "svelte/transition";
  import { formatRelative } from "date-fns";
  import type { CommentReply } from "./data/comments";
  import FaIcon from "./faIcon.svelte";
  import Comment from "./comment.svelte";
  export let poster = "";
  export let time = ""; //when it was posted
  export let post = "";

  let showComments = false;

  // $: showCommentStatement = showComments ? "Hide Comments" : "Show Comments";

  let comments: Array<CommentReply> = [
    {
      id: "1",
      text: "This is the first comment! This is the second comment!",
      time: new Date(),
      commenter_id: "1",
      commenter_name: "John Doe",
      post_id: "1",
      subcomments: [
        {
          id: "1",
          text: "This is a subcomment!",
          time: new Date(),
          commenter_id: "1",
          commenter_name: "John Doe",
          post_id: "1",
          subcomments: [
            {
              id: "1",
              text: "This is a subcomment!",
              time: new Date(),
              commenter_id: "1",
              commenter_name: "John Doe",
              post_id: "1",
              subcomments: [
                {
                  id: "1",
                  text: "This is a subcomment!",
                  time: new Date(),
                  commenter_id: "1",
                  commenter_name: "John Doe",
                  post_id: "1",
                  subcomments: [
                    {
                      id: "1",
                      text: "This is a subcomment!",
                      time: new Date(),
                      commenter_id: "1",
                      commenter_name: "John Doe",
                      post_id: "1",
                      subcomments: [
                        {
                          id: "1",
                          text: "This is a subcomment!",
                          time: new Date(),
                          commenter_id: "1",
                          commenter_name: "John Doe",
                          post_id: "1",
                          subcomments: [
                            {
                              id: "1",
                              text: "This is a subcomment!",
                              time: new Date(),
                              commenter_id: "1",
                              commenter_name: "John Doe",
                              post_id: "1",
                              subcomments: [
                                {
                                  id: "1",
                                  text: "This is a subcomment!",
                                  time: new Date(),
                                  commenter_id: "1",
                                  commenter_name: "John Doe",
                                  post_id: "1",
                                  subcomments: [
                                    {
                                      id: "1",
                                      text: "This is a subcomment!",
                                      time: new Date(),
                                      commenter_id: "1",
                                      commenter_name: "John Doe",
                                      post_id: "1",
                                      subcomments: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "2",
                  text: "This is a subcomment!",
                  time: new Date(),
                  commenter_id: "1",
                  commenter_name: "John Doe",
                  post_id: "1",
                  subcomments: [],
                },
              ],
            },
            {
              id: "1",
              text: "This is a subcomment!",
              time: new Date(),
              commenter_id: "1",
              commenter_name: "John Doe",
              post_id: "1",
              subcomments: [],
            },
            {
              id: "1",
              text: "This is a subcomment!",
              time: new Date(),
              commenter_id: "1",
              commenter_name: "John Doe",
              post_id: "1",
              subcomments: [],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      text: "This is the second comment!!!!",
      time: new Date(),
      commenter_id: "2",
      commenter_name: "Derek Butcher",
      post_id: "1",
      subcomments: [],
    },
    {
      id: "3",
      text: "Damn it! Pete forgot to remind me to post a comment in time!!",
      time: new Date(),
      commenter_id: "3",
      commenter_name: "Mary Jane Watson",
      post_id: "1",
      subcomments: [],
    },
    {
      id: "4",
      text: "Uhhh~!! I'm sorry, Mary!",
      time: new Date(),
      commenter_id: "4",
      commenter_name: "Peter Parker",
      post_id: "1",
      subcomments: [],
    },
  ];

  function toggleComments() {
    showComments = !showComments;
  }

  let commentsCount = comments.length;
</script>

<div
  class="w-8/12 min-h-[5rem] flex flex-col m-4 py-3 px-6 rounded-xl bg-slate-800 shadow-xl flex-shrink-0"
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
    <button
      type="button"
      class="font-semibold text-gray-400 transition-all hover:text-gray-200"
      on:click={toggleComments}
    >
      {commentsCount} Comments
    </button>
  </div>
</div>

{#if showComments}
  <div
    class="w-8/12 flex flex-col py-3 px-6 rounded-lg bg-slate-800 shadow-xl flex-shrink-0 relative overflow-hidden"
    transition:slide|local={{ duration: 300 }}
  >
    <p class="font-semibold text-xl p-3">Comments</p>

    <div>
      {#if comments.length > 0}
        {#each comments as comment}
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
          placeholder="Type a reply comment..."
          class="w-11/12 h-12 px-4 bg-slate-900 rounded-lg outline-none"
        />

        <button
          type="button"
          class="font-semibold text-gray-400 h-12 px-4 transition-all outline-none hover:text-emerald-400"
        >
          <FaIcon icon="paper-plane" />&nbsp;&nbsp;Reply
        </button>
      </div>
    </div>
  </div>
{/if}
