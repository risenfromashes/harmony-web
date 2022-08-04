<script lang="ts">
  let username = "";
  let password = "";
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container">
  <form class="py-8">
    <div class="input_form">
      <label for="username" class="input_form__label">Username</label>
      <input
        type="text"
        bind:value={username}
        placeholder="Username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 font-Roboto"
      />
    </div>

    <div class="input_form">
      <label for="password" class="input_form__label">Password</label>
      <input
        type="password"
        bind:value={password}
        placeholder="Password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 font-Roboto"
      />
    </div>
    <div class="mx-auto py-8">
      <a
        type="button"
        href="/login"
        class="text-white font-Roboto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-4 mr-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Log in
        <svg
          aria-hidden="true"
          class="ml-3 -mr-3 w-5 h-7"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </a>

      <a
        type="button"
        href="/register"
        class="text-white font-Roboto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-10"
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
      </a>
    </div>
  </form>
</div>

<style>
  .container {
    width: 88%;
    margin: 10px auto;
    padding-top: 100px;
  }

  form {
    width: 100%;
  }

  .input_form {
    margin-top: 32px;
  }

  .input_form__label {
    color: #fff;
    font-size: 5rem;
    letter-spacing: 1px;
    font-family: Roboto, Georgia, "Times New Roman", Times, serif;
  }

  a:disabled,
  button:disabled {
    pointer-events: none;
  }

  @media screen and (min-width: 600px) {
    .container {
      width: 67%;
    }
  }

  @media screen and (min-width: 760px) {
    .container {
      width: 52%;
    }

    .input_form__label {
      font-size: 0.9rem;
    }
  }

  @media screen and (min-width: 910px) {
    .container {
      width: 41%;
    }
  }

  @media screen and (min-width: 1080px) {
    .container {
      width: 37%;
    }
  }

  @media screen and (min-width: 1200px) {
    .input_form__label {
      font-size: calc(0.8rem + 1px);
    }
  }

  @media screen and (min-width: 1240px) {
    .container {
      width: 33%;
    }
  }

  @media screen and (min-width: 1390px) {
    .container {
      width: 28%;
    }
  }

  @media screen and (min-width: 1601px) {
    .container {
      width: 25%;
    }
  }

  @media screen and (min-width: 1751px) {
    .container {
      width: 23%;
    }
  }

  @media screen and (min-width: 1860px) {
    .container {
      width: 20%;
    }
  }
</style>
