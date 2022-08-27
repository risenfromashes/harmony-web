<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-navigator";
  import GroupTree from "../lib/grouptree.svelte";
  import Feed from "./feed.svelte";
  import Myevents from "./myevents.svelte";
  import Chats from "./chats.svelte";
  import Mypolls from "./mypolls.svelte";
  import Archive from "./archive.svelte";
  import type { Guild } from "../lib/data/chats";
  import { loadGroups, loadGroupsDev } from "../lib/data/groups";
  import { groups } from "../lib/stores/groups";
  import Tabs from "../lib/tabs.svelte";
  import { selected_tab } from "../lib/stores/tab";

  if ($selected_tab) {
    console.log($selected_tab);
    navigate($selected_tab.link);
  }

  //   loadGroups();
</script>

<div class="pt-20 w-full h-screen flex overflow-hidden">
  <!-- Tree -->
  <GroupTree groups={$groups} />
  <div class="w-10/12 flex-shrink-0 h-full">
    <Tabs />
    <div class="h-full overflow-y-scroll pb-12">
      <Router>
        <!-- now the tabs here -->
        <Route>
          <Feed />
        </Route>
        <Route path="feed">
          <Feed />
        </Route>
        <Route path="events">
          <Myevents />
        </Route>
        <Route path="chats">
          <Chats />
        </Route>
        <Route path="/polls">
          <Mypolls />
        </Route>
        <Route path="/archive/*">
          <Archive />
        </Route>
      </Router>
    </div>
  </div>
</div>
