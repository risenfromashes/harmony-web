<script lang="ts">
  import { scale, fade } from "svelte/transition";
  import PostItem from "../lib/post.svelte";
  import FaIcon from "../lib/faIcon.svelte";
  import Quill from "../lib/quill.svelte";
  import {
    type Group,
    getGroups,
    loadGroups,
    loadGroupsDev,
  } from "../lib/data/groups";
  import {
    type Post,
    getPosts,
    // getPostsDev,
    addPost,
    type PostContent,
    type PostEvent,
  } from "../lib/data/posts";
  import { current_group, current_subject, groups } from "../lib/stores/groups";
  import { navigate } from "svelte-navigator";
  import { current_user } from "../lib/stores/user";
  import { formatRelative } from "date-fns";
  import Loader from "../lib/loader.svelte";
  import type { QlImage, QlDelta } from "../lib/utilities/qlDeltaRenderer";
  import Nav from "../lib/nav.svelte";
  import { uploadImage } from "../lib/data/image";
  import { onDestroy, onMount } from "svelte";
  import { notifyTarget } from "../lib/events/notifytarget";

  let showEditor = false;
  let showGroupDropdown = false;

  let newPostContent: QlDelta;

  let posts: Array<Post> = [];

  if ($groups.length == 0) {
    loadGroups();
  }

  let loadPosts = async (gid, sid) => {
    try {
      posts = await getPosts(gid, sid, "0");
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  let enableSubmit = false;
  let loadPromise;

  $: if ($current_group && $current_subject) {
    console.log("current group: " + $current_group.id);
    console.log("current subject: " + $current_subject.id);
    loadPromise = loadPosts($current_group.id, $current_subject.id);
  }

  const submitPost = async () => {
    if (!current_user.loggedIn) {
      navigate("/login");
    }
    try {
      for (let delta of newPostContent.ops) {
        if (typeof delta.insert != "string" && delta.insert.image) {
          const ft = await fetch(delta.insert.image);
          let image = await uploadImage(await ft.blob());
          delta.insert.image = image.link;
        }
      }
      let pid = await addPost({
        poster_id: current_user.user_id,
        subject_id: $current_subject.id,
        group_id: $current_group.id,
        parent_post_id: "0",
        type: "quill-delta",
        content: JSON.stringify(newPostContent),
      });
      showEditor = false;
    } catch (e) {
      console.log(e);
      // todo show error
    }
  };

  let onTextChange = async (e: any) => {
    // console.log(e.detail);
    if (showEditor) {
      enableSubmit = e.detail.text.trim().length > 0;
      newPostContent = e.detail.delta;
    }
  };

  const searchPost = (post: Post, id: string): Post => {
    if (post.id == id) {
      return post;
    }
    let ret: Post;
    for (let child of post.comments) {
      ret = searchPost(child, id);
      if (ret != null) {
        return ret;
      }
    }
    return null;
  };

  const handleNewPost = async (e) => {
    if ($current_group && $current_subject) {
      const post: PostEvent = e.detail;
      if (
        post.group_id == $current_group.id &&
        post.subject_id == $current_subject.id
      ) {
        console.log("handler called");
        let parent: Post = null;
        if (post.parent_post_id != null) {
          for (let p of posts) {
            parent = searchPost(p, post.parent_post_id);
            if (parent != null) {
              break;
            }
          }
          if (parent == null) {
            return;
          }
        }
        if (parent == null) {
          posts = [...posts, post];
        } else {
          parent.comments = [...parent.comments, post];
        }
        posts = posts;
      }
    }
  };

  onMount(() => {
    notifyTarget.addEventListener("post", handleNewPost);
  });

  onDestroy(() => {
    notifyTarget.removeEventListener("post", handleNewPost);
  });
</script>

<svelte:head>
  <title>Showing Posts</title>
</svelte:head>

<div
  class="w-full bg-slate-900 flex flex-col-reverse justify-end items-center py-5 min-h-screen"
>
  {#if loadPromise}
    {#await loadPromise}
      <Loader />
    {:then}
      {#each posts as post}
        <PostItem
          {post}
          time={formatRelative(new Date(post.time), new Date()).replace(
            "t",
            "T"
          )}
        />
      {/each}
    {/await}
  {/if}

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
        class="bg-slate-900 flex flex-1 items-center border border-slate-700 rounded-lg text-left px-4 cursor-text overflow-hidden flex-shrink-0 whitespace-nowrap text-gray-400"
        on:click={() => {
          showEditor = true;
        }}
      >
        What's on your mind?
      </button>
    {:else}
      <div class="flex flex-col w-full h-full flex-grow">
        <Quill className="h-4/6 w-full" on:textChange={onTextChange} />

        <div
          class="w-auto p-2 flex items-center justify-end my-auto bg-slate-800"
        >
          <button
            type="button"
            class="resize-none mr-2 py-1 px-4 rounded-lg font-semibold text-lg transition-all outline-none hover:text-emerald-400"
            on:click={submitPost}
            disabled={!enableSubmit}
          >
            <FaIcon icon="paper-plane" />&nbsp;&nbsp;Send
          </button>
          <button
            type="button"
            class="resize-none py-1 px-4 rounded-lg font-semibold text-lg transition-all outline-none hover:text-emerald-400"
            on:click={() => {
              showEditor = false;
            }}
          >
            <FaIcon icon="times" />&nbsp;&nbsp;Cancel
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
