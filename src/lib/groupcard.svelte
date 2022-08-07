<script lang="ts">
  //declare an object with name, intro, institution, image_link, department, group_link and batch
  export let group = {
    id: 1,
    name: "",
    intro: "",
    institution: "",
    image_link: "",
    department: "",
    group_link: "",
    batch: "",
  };
</script>

<div
  class="flex items-center h-full shadow-md rounded-lg border hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
  <div>
    <!-- <button
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
    >
      <span class="sr-only">Open dropdown</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
        /></svg
      >
    </button> -->
    <!-- Dropdown menu -->
    <!-- <div
      id="dropdown"
      class="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
    >
      <ul class="py-1" aria-labelledby="dropdownButton">
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Edit</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Export Data</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Delete</a
          >
        </li>
      </ul>
    </div> -->
  </div>
  <div class="ml-4 flex-none overflow-hidden">
    <img
      class="object-cover w-20 h-20 rounded-2xl shadow-lg"
      src={group.image_link}
      alt=""
    />
  </div>

  <div class="p-5">
    <a href={group.group_link}>
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {group.name}
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {group.intro}
    </p>
  </div>
</div>
