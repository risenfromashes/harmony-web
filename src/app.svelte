<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import Nav from "./lib/nav.svelte";
  import About from "./routes/about.svelte";
  import EditProfile from "./routes/editprofile.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Mygroups from "./routes/mygroups.svelte";
  import Myevents from "./routes/myevents.svelte";
  import Chats from "./routes/chats.svelte";
  import Mypolls from "./routes/mypolls.svelte";
  import Loginregister from "./routes/loginregister.svelte";
  import Home from "./routes/home.svelte";
  import GroupSettings from "./routes/groupsettings.svelte";

  const routes: Map<string, string> = new Map([
    ["Home", "/home"],
    ["My Groups", "/mygroups"],
    ["Edit Profile", "/editprofile"],
    ["About", "/about"],
    ["Login&Register", "/login-register"],
  ]);
</script>

<Router>
  <div class="w-full h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="">
      <Route path="/">
        <Home />
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
      <Route path="/polls">
        <Mypolls />
      </Route>
      <Route path="/login-register">
        <Loginregister />
      </Route>
      <Route path="/groupsettings/:gid" let:params>
        <GroupSettings group_id={params.gid} />
      </Route>
    </div>
  </div>
</Router>
