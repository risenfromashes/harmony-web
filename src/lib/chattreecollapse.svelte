<script lang="ts">
  import { Link } from "svelte-navigator";
  import { slide } from "svelte/transition";
  import type { Guild } from "./data/chats";
  import { useLocation } from "svelte-navigator";
  import FaIcon from "./faIcon.svelte";
  import { get } from "svelte/store";

  const location = useLocation();

  $: query = new URLSearchParams($location.search);

  export let guild: Guild;

  let isOpen = false;

  const toggleCollapse = () => {
    isOpen = !isOpen;
  };
</script>

<div class="w-full">
  <div
    class={"w-full h-12 flex items-center pl-4 cursor-pointer hover:bg-slate-700" +
      (isOpen ? " bg-slate-700" : "")}
    on:click={toggleCollapse}
  >
    {#if isOpen}
      <FaIcon className="text-white" icon="chevron-down" />
    {:else}
      <FaIcon className="text-white" icon="chevron-right" />
    {/if}

    <FaIcon className="text-white ml-4" icon="school" />
    <p class="ml-3 font-semibold">{guild.name}</p>
  </div>

  {#if isOpen}
    <div class="w-full" transition:slide={{ duration: 200 }}>
      {#each guild.channels as channel}
        <Link to="/chats?g={channel.guild_id}&c={channel.channel_id}">
          <div
            class={"w-full h-12 flex items-center pl-8 hover:bg-slate-700" +
              (query.get("c") === channel.channel_id ? " bg-slate-700" : "")}
          >
            <FaIcon className="text-white" icon="flask" />
            <p class="ml-4">
              {channel.name}
            </p>
          </div>
        </Link>
      {/each}
    </div>
  {/if}
</div>
