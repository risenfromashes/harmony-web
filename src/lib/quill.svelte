<script lang="ts">
  import { quillmiddleware } from "./middlewares/quill";
  import { createEventDispatcher } from "svelte";

  export let className: string = "";

  const qlEditorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block"],
      ],
    },
    placeholder: "What's in you mind?",
    theme: "snow",
  };

  let dispatch = createEventDispatcher();

  let onTextChange = (e: any) => {
    dispatch("textChange", e.detail);
  };
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div class={className} id="editor">
  <div use:quillmiddleware={qlEditorOptions} on:text-change={onTextChange} />
</div>
