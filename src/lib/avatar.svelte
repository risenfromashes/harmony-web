<script lang="ts">
  export let dp: string;
  export let name: string;
</script>

{#if dp == null}
  <img
    src="https://www.gravatar.com/avatar/{name.length}?s=47&d=robohash"
    alt={name}
    class="object-cover w-full h-full"
  />
{:else}
  <img src={dp} alt={name} class="object-cover w-full h-full" />
{/if}
