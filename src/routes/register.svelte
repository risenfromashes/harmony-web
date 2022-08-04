<script>
  let first_name = "";
  let middle_name = "";
  let last_name = "";
  let dob = "";
  let username = "";
  let password = "";
</script>

<form class="w-1/3 mx-auto pt-10">
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <label
        for="first_name"
        class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
        >First name</label
      >
      <input
        type="text"
        id="first_name"
        class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        bind:value={first_name}
        placeholder="First Name"
        required
      />
    </div>
    <div>
      <label
        for="middle_name"
        class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
        >Middle name</label
      >
      <input
        type="text"
        id="middle_name"
        class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        bind:value={middle_name}
        placeholder="Middle Name"
      />
    </div>
    <div>
      <label
        for="last_name"
        class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
        >Last Name</label
      >
      <input
        type="text"
        id="last_name"
        class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Last Name"
        bind:value={last_name}
        required
      />
    </div>
    <div>
      <label
        for="dob"
        class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
        >Date Of Birth</label
      >
      <input
        type="date"
        id="dob"
        class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Date of Birth"
        pattern="DD-MM-YYYY"
        bind:value={dob}
        required
      />
    </div>
    <div>
      <label
        for="username"
        class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
        >Username</label
      >
      <input
        type="text"
        id="username"
        class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Username"
        bind:value={username}
        required
      />
    </div>
  </div>
  <div class="mb-6">
    <label
      for="email"
      class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
      >Email address</label
    >
    <input
      type="email"
      id="email"
      class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Email"
      required
    />
  </div>
  <div class="mb-6">
    <label
      for="password"
      class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
      >Password</label
    >
    <input
      type="password"
      id="password"
      class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="•••••••••"
      required
    />
  </div>
  <div class="mb-6">
    <label
      for="confirm_password"
      class="block mb-2 font-Rubik text-sm font-medium text-gray-900 dark:text-gray-300"
      >Confirm password</label
    >
    <input
      type="password"
      id="confirm_password"
      class="bg-gray-50 font-Rubik border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="•••••••••"
      bind:value={password}
      required
    />
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input
        id="remember"
        type="checkbox"
        value=""
        class="w-4 h-4 bg-gray-50 font-Rubik rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        required
      />
    </div>
    <label
      for="remember"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400 font-Rubik"
      >I am submitting my <strong>authentic</strong> information.</label
    >
  </div>
  <button
    type="submit"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-Rubik rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >Submit</button
  >
</form>
