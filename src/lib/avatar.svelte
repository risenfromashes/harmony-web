<script lang="ts">
  export let dp: string;
  export let name: string;
</script>

<div
  class="w-14 h-14 border border-slate-600 rounded-full overflow-hidden flex justify-center items-center mr-4 flex-shrink-0"
>
  {#if dp == null}
    <img
      src="https://www.gravatar.com/avatar/{name.length}?s=47&d=robohash"
      alt={name}
      class="object-cover w-full h-full"
    />
  {:else}
    <img src={dp} alt={name} class="object-cover w-full h-full" />
  {/if}
</div>
