<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import Show from "./routes/show.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";

  const routes: Map<string, string> = new Map([
    ["About", "/about"],
    ["Show", "/"],
    ["Login", "/login"],
    ["Register", "/register"],
  ]);
</script>

<Router>
  <div class="w-screen h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="py-20">
      <Route path="/">
        <Show />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </div>
  </div>
</Router>
