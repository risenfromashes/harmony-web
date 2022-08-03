<script lang="ts">
  import { Link } from "svelte-navigator";
  export let routes: Map<string, string>;
</script>

<nav
  class="bg-white px-2 sm:px-4 py-2.5 dark:bg-indigo-600 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
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
        <Link class="mx-5 text-lg underline font-serif" to={path}>{name}</Link>
      {/each}
    </div>
  </div>
</nav>
