<script lang="ts">
  import id from "date-fns/locale/id";
  import { Router, Link, Route } from "svelte-navigator";
  import ShowTab from "../lib/showtab.svelte";

  let tabs = [
    { id: 1, name: "Feed", icon: "", link: "/home/feed" },
    { id: 2, name: "Polls", icon: "", link: "/home/polls" },
    { id: 3, name: "Events", icon: "", link: "/home/events" },
    { id: 4, name: "Archive", icon: "", link: "/home/archive" },
    { id: 5, name: "Chats", icon: "", link: "/home/chats" },
  ];
</script>

<div class="mb-2 border-b border-gray-200 dark:border-gray-700 w-full">
  <ul
    class="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
    id="myTab"
    data-tabs-toggle="#myTabContent"
    role="tablist"
  >
    {#each tabs as tab}
      <li class="mr-2" role="presentation">
        <Link to={tab.link}>
          <ShowTab id={tab.id} name={tab.name} />
        </Link>
      </li>
    {/each}
  </ul>
</div>
