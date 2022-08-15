<script lang="ts">
  import { tweened } from "svelte/motion";
  import { backInOut, cubicOut } from "svelte/easing";

  //   export let delTime;
  export let percent;

  const progress = tweened(30, {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  });

  $: progress.set(percent);
</script>

<div class=" w-full h-6 bg-gray-200 rounded dark:bg-gray-700">
  <div class=" h-6 bg-yellow-400 rounded" style="width: {$progress}%" />
</div>
