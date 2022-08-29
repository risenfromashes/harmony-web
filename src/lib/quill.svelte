<script lang="ts">
  import { quillmiddleware } from "./middlewares/quill";
  import { createEventDispatcher } from "svelte";

  export let className: string = "";

  const qlEditorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block", "image"],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [false, "right", "center", "justify"] }],
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

<div class={className} id="editor">
  <div use:quillmiddleware={qlEditorOptions} on:text-change={onTextChange} />
</div>
