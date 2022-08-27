<script lang="ts">
  import { current_user } from "../lib/stores/user";

  import type { UserUpdate } from "src/lib/data/userupdate";
  import { navigate } from "svelte-navigator";
  import Loader from "../lib/loader.svelte";

  //extract the already existing data from the database
  let reg: UserUpdate = undefined;
  let other_pass = "";

  let warning = false;
  let warningText = "";

  let files;
  let image;
  let placeholder;
  let input;
  let showimage = false;
  let pictureSrc: string;

  const load = async () => {
    try {
      await current_user.fetchInfo();
      reg = (await current_user.fetchInfo()) as UserUpdate;
      reg.password = "";
      pictureSrc = reg.dp_link;
      if (pictureSrc != null) {
        showimage = true;
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  let newPicture = false;

  const loadPromise = load();

  const submitImage = async () => {
    const file: File = input.files[0];
    let res = await fetch(`/upload-image/${current_user.user_id}`, {
      method: "POST",
      headers: {
        "content-type": file.type,
        "content-length": file.size.toString(),
      },
      body: file,
    });

    if (res.ok) {
      let img = await res.json();
      return img.id;
    } else {
      warning = true;
      warningText = "Failed to upload image";
    }
  };

  const onChange = async () => {
    const file: File = input.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        warning = true;
        warningText = "Image size too large. Image should be under 5 MB";
      } else {
        newPicture = true;
        showimage = true;
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          pictureSrc = reader.result as string;
        });
        reader.readAsDataURL(file);
      }
    } else showimage = false;
  };

  let matched = true;

  $: {
    if (reg) {
      if (reg.password === other_pass) {
        matched = true;
      } else {
        matched = false;
      }
    }
  }

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
      warningText = "Username or password cannot be empty";
      return;
    }

    let uploadedPicture = false;
    if (newPicture) {
      reg.dp_id = "0";
      try {
        reg.dp_id = await submitImage();
        uploadedPicture = true;
      } catch (e) {
        warning = true;
        warningText = "Couldn't upload image";
      }
    }

    try {
      let res = await fetch("/update-info", {
        method: "POST",
        body: JSON.stringify(reg),
      });
      const body = await res.json();

      if (res.ok) {
        warning = false;
        if (uploadedPicture) {
          newPicture = false;
        }
        reg = (await current_user.fetchInfo()) as UserUpdate;
        reg.password = "";
        other_pass = "";
      } else {
        warning = true;
        warningText = body.reason;
      }
    } catch (e) {
      warning = true;
      warningText = `Error: ${e}`;
    }
  };
</script>

{#await loadPromise}
  <Loader />
{:then}
  <div class="bg-slate-900">
    <form class="w-1/3 mx-auto pt-40 pb-10" on:submit|preventDefault={submit}>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <label
          for="first_name"
          class="col-span-2 h-auto block font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
          >Profile Picture
        </label>
        <div class="flex justify-center items-center col-span-1">
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
        <div class="col-span-1">
          {#if showimage}
            <img
              bind:this={image}
              src={pictureSrc}
              alt="Preview"
              class="rounded-full object-cover mx-auto h-64 w-64"
            />
          {:else}
            <div class="bg-slate-700 mx-auto h-64 w-64 rounded-full" />
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
            <span class="font-medium font-OpenSans">Passwords do not match</span
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
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-OpenSans rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button
      >
      {#if warning}
        <div
          class="mb-6 h-24 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span class="font-medium">Login Unsuccessful!</span>
          {warningText}
        </div>
      {/if}
    </form>
  </div>
{/await}
