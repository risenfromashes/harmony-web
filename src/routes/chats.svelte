<script lang="ts">
  import Chattree from "../lib/tree.svelte";
  import Chatchannelviewer from "../lib/chatchannelviewer.svelte";

  import { useLocation } from "svelte-navigator";
  import type { Guild } from "../lib/data/chats";
  import { loadGroups, loadGroupsDev } from "../lib/data/groups";
  import { groups } from "../lib/stores/groups";

  loadGroups();
</script>

<div class="pt-5 w-full h-full flex overflow-hidden">
  <!-- Chat -->
  <Chatchannelviewer />
</div>
