<script lang="ts">
  import Chattree from "../lib/chattree.svelte";
  import Chatchannelviewer from "../lib/chatchannelviewer.svelte";

  import { useLocation } from "svelte-navigator";
  import type { Guild } from "../lib/data/chats";
  import { loadGroups, loadGroupsDev } from "../lib/data/groups";
  import { groups } from "../lib/stores/groups";

  const location = useLocation();

  loadGroups();
</script>

<div class="pt-20 w-full h-screen flex overflow-hidden">
  <!-- Tree -->
  <Chattree groups={$groups} />

  <!-- Chat -->
  <Chatchannelviewer />
</div>
