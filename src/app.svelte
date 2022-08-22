<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import Feed from "./routes/feed.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Mygroups from "./routes/mygroups.svelte";
  import Myevents from "./routes/myevents.svelte";
  import Chats from "./routes/chats.svelte";
  import QuillDemo from "./routes/quillDemo.svelte";
  import Mypolls from "./routes/mypolls.svelte";

  const routes: Map<string, string> = new Map([
    ["About", "/about"],
    ["Login", "/login"],
    ["Register", "/register"],
    ["Feed", "/"],
    ["My Groups", "/mygroups"],
    ["My Events", "/myevents"],
    ["Chats", "/chats"],
    ["Quill", "/quill"],
    ["Polls", "/polls"],
  ]);
</script>

<div class="w-full h-screen bg-slate-900 text-slate-100">
  <Router>
    <Nav {routes} />

    <Route path="/" component={Feed} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/mygroups" component={Mygroups} />
    <Route path="/myevents" component={Myevents} />
    <Route path="/chats" component={Chats} />
    <Route path="/quill" component={QuillDemo} />
    <Route path="/polls" component={Mypolls} />
  </Router>
</div>
