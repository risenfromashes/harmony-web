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

  let color = "";

  $: {
    if ($progress === 100) {
      color = "bg-emerald-400";
    } else if ($progress >= 50) {
      color = "bg-blue-400";
    } else if ($progress > 10) {
      color = "bg-yellow-400";
    } else {
      color = "bg-red-400";
    }
  }
</script>

<div class="w-full h-6 bg-gray-200 rounded dark:bg-gray-700">
  <div
    class="h-6 rounded {color} transition-colors"
    style="width: {$progress}%"
  />
</div>
