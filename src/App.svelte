<script lang="ts">
  import { onMount, setContext } from "svelte";

  import {
    key as userContextKey,
    initialValue as userContextInitialValue,
  } from "./lib/userContext";

  import LoginForm from "./lib/LoginForm.svelte";

  onMount(() => {
    setContext(userContextKey, userContextInitialValue);
  });

  const submit = (data) => {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
</script>

<section>
  <LoginForm {submit} />
</section>

<style>
  section {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #cd76e2, #e358ab);
  }
</style>
