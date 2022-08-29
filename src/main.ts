import "./app.css";
import "./styles/quill.snow.css";
import "./styles/quillBased.css";
import "./styles/github-dark.css";
import App from "./app.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
