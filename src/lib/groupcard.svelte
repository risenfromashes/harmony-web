<script lang="ts">
  //declare an object with name, intro, institution, image_link, department, group_link and batch
  export let group = {
    id: 1,
    name: "লৌহ",
    intro:
      "One byte lighter we design, one moment speedier we code, one pixel brighter we turn the universe.",
    institution: "BUET",
    image_link: "https://picsum.photos/200/300",
    department: "CSE",
    group_link: "",
    batch: "17",
  };
</script>

<div
  class="flex items-center font-Roboto shadow-md rounded-lg border hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
  <a href={group.group_link}>
    <img class="rounded-t-lg object-fill" src={group.image_link} alt="" />
  </a>
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
    <a
      href={group.group_link}
      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Visit
      <svg
        aria-hidden="true"
        class="ml-2 -mr-1 w-4 h-4"
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
  </div>
</div>
