<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { slide } from "svelte/transition";

  let { index } = getContext("index");
  let { size } = getContext("size");

  export let open = false;

  let id = index();

  let btn_class =
    "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800";

  let svg_class_down = "w-6 h-6 shrink-0";
  let svg_class_up = "w-6 h-6 shrink-0 rotate-180";

  let body_class =
    "p-5 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900";

  onMount(() => {
    if (open) {
      open = true;
    }

    if (id == 0) {
      btn_class += " rounded-t-xl";
    } else if (id == size() - 1) {
      // last
      btn_class += " border-b-0";
      body_class += " border-b-0";
    }
  });

  const handle_toggle = () => {
    open = !open;
  };
</script>

<h2>
  <button type="button" class={btn_class} on:click={handle_toggle}>
    <slot name="header" />
    <svg
      data-accordion-icon
      class={open ? svg_class_up : svg_class_down}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg
    >
  </button>
</h2>

{#if open}
  <div transition:slide|local>
    <div class={body_class}>
      <slot name="body" />
    </div>
  </div>
{/if}
