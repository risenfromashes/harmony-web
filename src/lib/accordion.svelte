<script lang="ts">
  import { onMount, setContext } from "svelte";
  let next_index = 0;
  let size = 0;

  setContext("index", {
    index: () => next_index++,
  });
  setContext("size", {
    size: () => size,
  });

  onMount(() => {
    size = next_index;
  });
</script>

<slot />
