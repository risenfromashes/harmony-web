<script lang="ts">
  import "https://kit.fontawesome.com/923fc2e44a.js";

  export const type: string = "solid";
  export let icon: string;
  export let className: string = "";
</script>

{#if type === "solid"}
  <span class={className}>
    <i class="fas fa-{icon}" />
  </span>
{:else if type === "regular"}
  <span>
    <i class="far fa-{icon}" />
  </span>
{:else if type === "brands"}
  <span>
    <i class="fab fa-{icon}" />
  </span>
{/if}
