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
  class="flex items-center h-40 shadow-md rounded-lg border hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
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
