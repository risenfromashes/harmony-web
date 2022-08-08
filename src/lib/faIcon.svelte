<script lang="ts">
  import "https://kit.fontawesome.com/923fc2e44a.js";

  export const type: string = "solid";
  export let icon: string;
</script>

{#if type === "solid"}
  <i class="fas fa-{icon}" />
{:else if type === "regular"}
  <i class="far fa-{icon}" />
{:else if type === "brands"}
  <i class="fab fa-{icon}" />
{/if}
