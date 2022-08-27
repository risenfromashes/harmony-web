<script lang="ts">
  import id from "date-fns/locale/id";
  import { Router, Link, Route } from "svelte-navigator";
  import ShowTab from "../lib/showtab.svelte";
  import { tabs } from "./stores/tab";
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
          <ShowTab {tab} />
        </Link>
      </li>
    {/each}
  </ul>
</div>
