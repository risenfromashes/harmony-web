<script lang="ts">
  import Chattree from "../lib/chattree.svelte";
  import Chatchannelviewer from "../lib/chatchannelviewer.svelte";

  import { useLocation } from "svelte-navigator";
  import type { Guild } from "../lib/data/chats";

  const location = useLocation();

  export const guilds: Array<Guild> = [
    {
      guild_id: "123456789",
      name: "CSE101",
      description: "",
      icon: "",
      owner_id: "123456789",
      channels: [
        {
          channel_id: "1234567891",
          guild_id: "123456789",

          name: "general",
          description: "",
        },
        {
          channel_id: "1234567892",
          guild_id: "123456789",
          name: "study-barta",
          description: "",
        },
        {
          channel_id: "1234567893",
          guild_id: "123456789",
          name: "memes",
          description: "",
        },
      ],
    },
    {
      guild_id: "123456799",
      name: "ART101",
      description: "",
      icon: "",
      owner_id: "123456789",
      channels: [
        {
          channel_id: "1234567991",
          guild_id: "123456799",
          name: "general",
          description: "",
        },
        {
          channel_id: "1234567992",
          guild_id: "123456799",
          name: "notes",
          description: "",
        },
        {
          channel_id: "1234567993",
          guild_id: "123456799",
          name: "memes",
          description: "",
        },
      ],
    },
  ];

  $: console.log($location.search);
</script>

<div class="pt-20 w-full h-screen flex overflow-hidden">
  <!-- Tree -->
  <Chattree {guilds} />

  <!-- Chat -->
  <Chatchannelviewer />
</div>
