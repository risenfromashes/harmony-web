<script lang="ts">
  import { fly } from "svelte/transition";

  let username = "";
  let password = "";
  let warning = false;
  let warning_text = "";

  let reg = {
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    user_name: "",
    password: "",
  };
  let other_pass = "";
  let matched = true;

  let pageStateLogin = true;

  function changeState() {
    pageStateLogin = !pageStateLogin;
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div
  class="h-screen w-full bg-nebula bg-cover bg-[center_right] overflow-hidden"
>
  <div
    class="h-screen w-full relative overflow-hidden custom-shadow-{pageStateLogin
      ? 'login'
      : 'signup'}"
  >
    <div
      class="fixed h-full w-{pageStateLogin ? '9' : '8'}/12 {pageStateLogin
        ? 'right'
        : 'left'}-0 flex flex-col justify-center items-center px-16 transition-all"
    >
      <div class="h-full flex flex-col justify-center">
        <p class="text-8xl font-bold mb-8">Harmony</p>
        <p class="text-2xl w-[65rem]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet non
          iusto optio dicta hic, velit adipisci blanditiis mollitia eaque
          debitis nobis ea? Omnis facilis dolor suscipit aspernatur molestiae
          quo perspiciatis.
        </p>
      </div>
    </div>

    <div
      class="fixed left-0 h-[100%] w-3/12 bg-slate-800 custom-clipped-login {pageStateLogin
        ? 'translate-x-0'
        : '-translate-x-full'} custom-transition"
    />

    <div
      class="fixed right-0 h-[100%] w-4/12 bg-slate-800 custom-clipped-register {!pageStateLogin
        ? 'translate-x-0'
        : 'translate-x-full'} custom-transition"
    />

    <!-- Login Part -->
    {#if pageStateLogin}
      <div
        class="fixed left-0 h-full w-4/12"
        in:fly={{
          x: -300,
          duration: 500,
          delay: 100,
        }}
        out:fly={{
          x: -300,
          duration: 500,
        }}
      >
        <form
          class="w-10/12 h-full flex flex-col justify-center items-start pl-4"
        >
          <figure class="w-full mb-8 pl-8">
            <p class="text-3xl font-semibold mb-2">Login</p>
            <figcaption>
              One of our members? <span class="font-medium">Welcome Back!</span>
            </figcaption>
          </figure>

          <div class="w-full flex flex-col justify-center items-start pl-8">
            <label
              for="username"
              class="block w-7/12 mb-1 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
              >Username</label
            >
            <input
              type="text"
              bind:value={username}
              placeholder="Username"
              class="w-7/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 font-OpenSans"
            />
          </div>

          <div
            class="mt-8 w-full flex flex-col justify-center items-start pl-8"
          >
            <label
              for="password"
              class="block w-7/12 mb-1 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
              >Password</label
            >
            <input
              type="password"
              bind:value={password}
              placeholder="Password"
              class="w-7/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 font-OpenSans"
            />
          </div>

          <div class="w-full pt-8 flex pl-8">
            <button
              type="button"
              class="text-white font-OpenSans bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-5 py-2.5 px-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer align-middle"
            >
              Log in
              <svg
                aria-hidden="true"
                class="ml-3 -mr-3 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                /></svg
              >
            </button>

            <button
              type="button"
              href="/register"
              class="text-white font-OpenSans bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5 hover:cursor-pointer align-middle"
              on:click={changeState}
            >
              <svg
                aria-hidden="true"
                class="mr-2 -ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                /></svg
              >
              Register
            </button>
          </div>
        </form>

        {#if warning}
          <div
            class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span class="font-medium">Login Unsuccessful!</span>
            {warning_text}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Register Part -->
    {#if !pageStateLogin}
      <div
        class="fixed right-0 h-full w-4/12 flex justify-end pr-4"
        in:fly={{
          x: 300,
          duration: 500,
          delay: 200,
        }}
        out:fly={{
          x: 300,
          duration: 500,
        }}
      >
        <form
          class="w-9/12 h-full flex flex-col justify-center items-center pr-8"
        >
          <figure class="w-full mb-8 text-right pr-2">
            <p class="text-3xl font-semibold mb-2">Register</p>
            <figcaption>
              Newcomer? <span class="font-medium"
                >Welcome to <span class="text-emerald-500 font-bold"
                  >Harmony</span
                >!</span
              >
            </figcaption>
          </figure>

          <div class="w-full flex flex-wrap mb-4">
            <div class="w-1/2 py-2 px-4">
              <label
                for="first_name"
                class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
                >First name</label
              >
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                bind:value={reg.first_name}
                placeholder="First Name"
                required
              />
            </div>

            <div class="w-1/2 py-2 px-4">
              <label
                for="middle_name"
                class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
                >Middle name</label
              >
              <input
                type="text"
                id="middle_name"
                class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                bind:value={reg.middle_name}
                placeholder="Middle Name"
              />
            </div>

            <div class="w-1/2 py-2 px-4">
              <label
                for="last_name"
                class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
                >Last Name</label
              >
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last Name"
                bind:value={reg.last_name}
                required
              />
            </div>

            <div class="w-1/2 py-2 px-4">
              <label
                for="dob"
                class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
                >Date Of Birth</label
              >
              <input
                type="date"
                id="dob"
                class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Date of Birth"
                pattern="DD-MM-YYYY"
                bind:value={reg.dob}
                required
              />
            </div>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="username"
              class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
              >Username</label
            >
            <input
              type="text"
              id="username"
              class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              bind:value={reg.user_name}
              required
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="email"
              class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
              >Email address</label
            >
            <input
              type="email"
              id="email"
              class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="password"
              class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
              >Password</label
            >
            <input
              type="password"
              id="password"
              class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              bind:value={reg.password}
              required
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="match"
              class="block mb-2 font-OpenSans text-sm font-medium text-gray-700 dark:text-gray-300"
              >Confirm password</label
            >
            <input
              type="password"
              id="confirm_password"
              class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              bind:value={other_pass}
              required
            />
          </div>
          <!-- if matched then show text in green, else in red -->
          {#if reg.password != "" && other_pass != ""}
            {#if matched}
              <p class="mt-2 text-sm text-green-600 dark:text-green-500 mb-2">
                <span class="font-medium font-OpenSans">Passwords match</span>
              </p>
            {:else}
              <p class="mt-2 text-sm text-red-600 dark:text-red-500 mb-2">
                <span class="font-medium font-OpenSans"
                  >Passwords do not match</span
                >
              </p>
            {/if}
          {/if}
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 bg-gray-50 font-OpenSans rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400 font-OpenSans"
              >I am submitting my <strong>authentic</strong> information.</label
            >
          </div>

          <div class="w-10/12 flex justify-center">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-OpenSans rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Submit</button
            >

            <button
              type="button"
              href="/login"
              class="text-white font-OpenSans bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5 hover:cursor-pointer align-middle"
              on:click={changeState}
            >
              <svg
                aria-hidden="true"
                class="mr-2 -ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                /></svg
              >
              Login
            </button>
          </div>

          {#if warning}
            <div
              class="mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span class="font-medium">Login Unsuccessful!</span>
              {warning_text}
            </div>
          {/if}
        </form>
      </div>
    {/if}
  </div>
</div>

<style>
  .custom-clipped-login {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }

  .custom-clipped-register {
    clip-path: polygon(100% 100%, 0 100%, 13% 0, 100% 0);
  }

  .custom-shadow-login {
    filter: drop-shadow(1.25em 0.75em 15px rgba(0, 0, 0, 0.5));
  }

  .custom-shadow-signup {
    filter: drop-shadow(-1.25em 0.75em 15px rgba(0, 0, 0, 0.5));
  }

  .custom-transition {
    transition: all 500ms ease-out;
  }
</style>
