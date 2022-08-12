<script lang="ts">
  import type { QuillTextChangeEvent } from "../lib/middlewares/quill";
  import { renderDelta } from "../lib/utilities/qlDeltaRenderer";

  import Quill from "../lib/quill.svelte";

  let displayContainer: HTMLElement;
  let quill: Element;

  const onTextChange = (e: QuillTextChangeEvent) => {
    renderDelta(displayContainer, e.detail.delta);
  };
</script>

<div class="w-screen h-screen pt-20 grid grid-cols-2">
  <Quill className="h-full w-full border" on:textChange={onTextChange} />
  <div class="h-full w-full border" bind:this={displayContainer} />
</div>
