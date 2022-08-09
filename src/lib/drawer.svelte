<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";

  export let open: boolean = false;
  export let transition_axis: string = "y";
  export let btn_class: string =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
  export let btn_text = "";
  export let title = "";
  export let title_class =
    "inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400";

  onMount(() => {
    if (open) {
      open = true;
    }
  });

  export function toggle() {
    open = !open;
  }

  function slide(
    node,
    { delay = 0, duration = 400, easing = cubicOut, axis = transition_axis }
  ) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const primary_dimension = axis === "y" ? "height" : "width";
    const primary_dimension_value = parseFloat(style[primary_dimension]);
    const secondary_dimensions =
      axis === "y" ? ["Top", "Bottom"] : ["Left", "Right"];
    const padding_start_value = parseFloat(
      style.padding + secondary_dimensions[0]
    );
    const padding_end_value = parseFloat(
      style.padding + secondary_dimensions[1]
    );
    const margin_start_value = parseFloat(
      style.margin + secondary_dimensions[0]
    );
    const margin_end_value = parseFloat(style.margin + secondary_dimensions[1]);
    const border_width_start_value = parseFloat(
      style[`border${secondary_dimensions[0]}Width`]
    );
    const border_width_end_value = parseFloat(
      style[`border${secondary_dimensions[1]}Width`]
    );
    return {
      delay,
      duration,
      easing,
      css: (t) =>
        "overflow: hidden;" +
        `opacity: ${Math.min(t * 20, 1) * opacity};` +
        `${primary_dimension}: ${t * primary_dimension_value}px;` +
        `padding-${secondary_dimensions[0].toLowerCase()}: ${
          t * padding_start_value
        }px;` +
        `padding-${secondary_dimensions[1].toLowerCase()}: ${
          t * padding_end_value
        }px;` +
        `margin-${secondary_dimensions[0].toLowerCase()}: ${
          t * margin_start_value
        }px;` +
        `margin-${secondary_dimensions[1].toLowerCase()}: ${
          t * margin_end_value
        }px;` +
        `border-${secondary_dimensions[0].toLowerCase()}-width: ${
          t * border_width_start_value
        }px;` +
        `border-${secondary_dimensions[1].toLowerCase()}-width: ${
          t * border_width_end_value
        }px;`,
    };
  }
</script>

<!-- drawer init and show -->
<div class="text-center">
  <button
    class={btn_class}
    type="button"
    data-drawer-target="drawer-contact"
    data-drawer-show="drawer-contact"
    aria-controls="drawer-contact"
    on:click={toggle}
  >
    {btn_text}
  </button>
</div>

<!-- drawer component -->
{#if open}
  <div
    id="drawer-contact"
    class="fixed z-40 h-screen p-5 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 transform-none"
    transition:slide={{ axis: transition_axis }}
    tabindex="-1"
    aria-labelledby="drawer-contact-label"
    aria-modal="true"
    role="dialog"
  >
    <h5 id="drawer-label" class={title_class}>
      <svg
        class="w-5 h-5 mr-2"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >{title}
    </h5>
    <button
      type="button"
      data-drawer-dismiss="drawer-contact"
      aria-controls="drawer-contact"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      on:click={() => {
        open = false;
      }}
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
      <span class="sr-only">Close menu</span>
    </button>

    <slot name="body" />
  </div>
{/if}
