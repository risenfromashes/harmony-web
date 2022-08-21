<script lang="ts">
  //extract the already existing data from the database
  let reg = {
    user_name: "Sadat999",
    password: "helloworld",
    first_name: "Mohammad",
    middle_name: "Sadat",
    last_name: "Hossain",
    dob: "",
  };

  let files;
  let image;
  let placeholder;
  let input;
  let showimage = false;

  $: console.log(files);

  function onChange() {
    const file = input.files[0];

    if (file) {
      showimage = true;
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);
    } else showimage = false;
  }

  let other_pass = reg.password;

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
    if (!matched) {
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
</script>

<div class="bg-slate-900">
  <form class="w-1/3 mx-auto pt-40 pb-10" on:submit|preventDefault={submit}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <label
        for="first_name"
        class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
        >Profile Picture</label
      >
      <div class="flex justify-center items-center w-full col-span-2">
        <label
          for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col justify-center items-center pt-2 pb-6">
            <svg
              aria-hidden="true"
              class="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              /></svg
            >
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              JPEG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept=".jpg, .png, .jpeg, .gif"
            bind:this={input}
            class="hidden"
            on:change={onChange}
          />
        </label>
      </div>
      <div class="col-span-2">
        {#if showimage}
          <img
            bind:this={image}
            src=""
            alt="Preview"
            class="w-full rounded-lg"
          />
        {:else}
          <span class="mx-auto">Image Preview</span>
        {/if}
      </div>
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
      <input
        type="password"
        id="password"
        class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        bind:value={reg.password}
        required
      />
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
