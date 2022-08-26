<script lang="ts">
  let reg = {
    user_name: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
  };

  let other_pass = "";

  let matched = true;

  $: {
    if (reg.password === other_pass) {
      matched = true;
    } else {
      matched = false;
    }
  }

  let warning = false;
  let warning_text = "";

  const submit = async () => {
    if (!matched || reg.password.length < 5) {
      return;
    }

    reg.user_name = reg.user_name.trim();
    reg.password = reg.password.trim();
    reg.first_name = reg.first_name.trim();
    reg.middle_name = reg.middle_name.trim();
    reg.last_name = reg.last_name.trim();

    if (reg.user_name.length == 0 || reg.password.length == 0) {
      warning = true;
      warning_text = "Username or password cannot be empty";
      return;
    }

    try {
      let res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify(reg),
      });
      const body = await res.json();

      if (res.ok) {
        warning = false;
        window.location.pathname = "/login";
      } else {
        warning = true;
        warning_text = body.reason;
      }
    } catch (e) {
      warning = true;
      warning_text = `Error: ${e}`;
    }
  };

  let bothcase: boolean = false;
  let symbol: boolean = false;
  let largepass: boolean = false;
  let level: number = 0;
  const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  $: {
    largepass = reg.password.length >= 10 ? true : false;
    //check if password contains letters of both cases
    bothcase =
      reg.password.match(/[a-z]/) && reg.password.match(/[A-Z]/) ? true : false;
    //check if the password contains any symbol
    symbol = specialChars.test(reg.password) ? true : false;
    if (reg.password.length >= 5) {
      level = 1;
      if (bothcase) level++;
      if (largepass) level++;
      if (symbol) level++;
    } else level = 0;
    console.log(level, symbol, bothcase, largepass);
  }

  let showtooltip: boolean = false;
</script>

<div class="bg-slate-900">
  <form class="w-1/3 mx-auto pt-40" on:submit|preventDefault={submit}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
    </div>
    <div class="mb-6">
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
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
        >Password</label
      >
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <input
        type="password"
        id="password"
        class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        bind:value={reg.password}
        required
        on:mouseover={() => (showtooltip = true)}
        on:mouseout={() => (showtooltip = false)}
      />
      {#if showtooltip}
        <div
          id="popover-password"
          role="tooltip"
          class="inline-block absolute z-10 w-72 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        >
          <div class="p-3 space-y-2">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Must have at least 5 characters
            </h3>
            <div class="grid grid-cols-4 gap-2">
              {#each { length: level } as _, i}
                <div class="h-1 bg-orange-300 dark:bg-orange-400" />
              {/each}
              {#each { length: 4 - level } as _, i}
                <div class="h-1 bg-gray-200 dark:bg-gray-600" />
              {/each}
            </div>
            <p>It’s better to have:</p>
            <ul>
              <li class="flex items-center mb-1">
                {#if bothcase}
                  <svg
                    class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {:else}
                  <svg
                    class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {/if}
                Upper & lower case letters
              </li>
              <li class="flex items-center mb-1">
                {#if symbol}
                  <svg
                    class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {:else}
                  <svg
                    class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {/if}
                A symbol (#$&)
              </li>
              <li class="flex items-center">
                {#if largepass}
                  <svg
                    class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {:else}
                  <svg
                    class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    /></svg
                  >
                {/if}
                A longer password (min. 10 chars.)
              </li>
            </ul>
          </div>
        </div>
      {/if}
    </div>
    <div class="mb-6">
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
          <span class="font-medium font-OpenSans">Passwords do not match</span>
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
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-OpenSans rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Submit</button
    >
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
