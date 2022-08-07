<script lang="ts">
  import { Link } from "svelte-navigator";
  export let routes: Map<string, string>;

  let showDrawer = false;
</script>

<nav
  class="dark:bg-gray-900 flex items-center justify-between w-full py-3 px-2 sm:px-4 fixed z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-800"
>
  <a href="https://www.harmony-open.com/" class="flex items-center z-40">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Harmony Logo"
    />
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >Harmony</span
    >
  </a>

  <button
    type="button"
    class="p-2 md:hidden flex flex-col items-center justify-evenly z-40"
    on:click={() => (showDrawer = !showDrawer)}
  >
    <div class="h-[0.15rem] w-8 bg-white my-1" />
    <div class="h-[0.15rem] w-8 bg-white my-1" />
    <div class="h-[0.15rem] w-8 bg-white my-1" />
  </button>

  <div
    class={"absolute top-0 left-0 flex-col z-20 bg-gray-900 w-full h-screen items-center justify-center flex md:relative md:flex-row md:h-auto md:w-auto transition-all " +
      (showDrawer ? "translate-x-0" : "translate-x-full") +
      " md:top-auto md:left-auto md:translate-x-0"}
  >
    {#each [...routes] as [name, path]}
      <div class="hover:text-rose-400">
        <Link
          class="m-3 text-lg underline font-serif"
          to={path}
          on:click={() => (showDrawer = !showDrawer)}>{name}</Link
        >
      </div>
    {/each}
  </div>
</nav>

<!-- <nav
  class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="https://www.harmony-open.com/" class="flex items-center">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-3 h-6 sm:h-9"
        alt="Harmony Logo"
      />
      <span
        class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >Harmony</span
      >
    </a>
    <div
      class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      {#each [...routes] as [name, path]}
        <div class="hover:text-rose-400">
          <Link class="mx-5 text-lg underline font-serif" to={path}>{name}</Link
          >
        </div>
      {/each}
    </div>
  </div>
</nav> -->
