<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import Feed from "./routes/feed.svelte";
  import EditProfile from "./routes/editprofile.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Mygroups from "./routes/mygroups.svelte";
  import Myevents from "./routes/myevents.svelte";
  import Chats from "./routes/chats.svelte";
  import QuillDemo from "./routes/quillDemo.svelte";
  import Mypolls from "./routes/mypolls.svelte";
  import Archive from "./routes/archive.svelte";

  const routes: Map<string, string> = new Map([
    ["About", "/about"],
    ["Login", "/login"],
    ["Register", "/register"],
    ["Edit Profile", "/editprofile"],
    ["Feed", "/"],
    ["My Groups", "/mygroups"],
    ["My Events", "/myevents"],
    ["Chats", "/chats"],
    ["Quill", "/quill"],
    ["Polls", "/polls"],
    ["Archive", "/archive"],
  ]);
</script>

<Router>
  <div class="w-full h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="">
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
      <Route path="/editprofile">
        <EditProfile />
      </Route>
      <Route path="/mygroups">
        <Mygroups />
      </Route>
      <Route path="/myevents">
        <Myevents />
      </Route>
      <Route path="/chats">
        <Chats />
      </Route>
      <Route path="/quill">
        <QuillDemo />
      </Route>
      <Route path="/polls">
        <Mypolls />
      </Route>
      <Route path="/archive/*"><Archive /></Route>
    </div>
  </div>
</Router>
