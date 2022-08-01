<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import Show from "./routes/show.svelte";

  const routes: Map<string, string> = new Map([
    ["About", "/about"],
    ["Show", "/"],
  ]);
</script>

<Router>
  <Nav {routes} />
  <div>
    <Route path="/">
      <Show />
    </Route>
    <Route path="/about">
      <About />
    </Route>
  </div>
</Router>
