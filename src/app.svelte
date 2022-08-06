<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import Feed from "./routes/feed.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Mygroups from "./routes/mygroups.svelte";

  const routes: Map<string, string> = new Map([
    ["About", "/about"],
    ["Login", "/login"],
    ["Register", "/register"],
    ["Feed", "/"],
    ["My Groups", "/mygroups"],
  ]);
</script>

<Router>
  <div class="w-full h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="pt-8">
      <Route path="/">
        <Feed />
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
      <Route path="/mygroups">
        <Mygroups />
      </Route>
    </div>
  </div>
</Router>
