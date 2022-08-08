<script>
  import GroupCard from "./groupcard.svelte";
  //declare an array of groups with id name, intro, institution, image_link, department, group_link and batch
  //later take this from database
  let groups = [
    {
      id: 1,
      name: "CSE '20",
      intro:
        "One byte lighter we design, one moment speedier we code, one pixel brighter we turn the universe.",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "CSE",
      group_link: "",
      batch: "20",
    },
    {
      id: 2,
      name: "EEE '20",
      intro:
        "Let's be connected with invisible wires and form a circuit where emotions will flow for eternity!",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "EEE",
      group_link: "",
      batch: "20",
    },
    {
      id: 3,
      name: "BME '20",
      intro:
        "This is where we bring machines to life. This is where we repel the darkness of demise.",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "BME",
      group_link: "",
      batch: "20",
    },
    {
      id: 4,
      name: "ME '20",
      intro:
        "Mecha mends mecha moulds mecha mesmerizes, mecha makes every loose end tight, mecha doesnt argue just explains why its right.",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "ME",
      group_link: "",
      batch: "20",
    },
    {
      id: 5,
      name: "IPE '20",
      intro:
        "Industry generates revolution. Production drives innovation. Here, our forte is optimization!",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "IPE",
      group_link: "",
      batch: "20",
    },
    {
      id: 6,
      name: "ChE '20",
      intro:
        "One united ChE. Let's dilute our sorrows, compress worries,filter mistakes, evaporate egos to get the crystal of happiness.",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "ChE",
      group_link: "",
      batch: "20",
    },
    {
      id: 7,
      name: "EEE '20",
      intro:
        "Let's be connected with invisible wires and form a circuit where emotions will flow for eternity!",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "EEE",
      group_link: "",
      batch: "20",
    },
    {
      id: 8,
      name: "MME '20",
      intro:
        "All the outer dazzling structures,our works with their moiety; Where's zero? also faraway, to show all is our liability.",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "MME",
      group_link: "",
      batch: "20",
    },
    {
      id: 9,
      name: "NAME '20",
      intro:
        "Embodied our notion, our concern is as vast as the ocean. Our sagacity is as deep as sea",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "NAME",
      group_link: "",
      batch: "20",
    },
    {
      id: 10,
      name: "NAME '20",
      intro:
        "Embodied our notion, our concern is as vast as the ocean. Our sagacity is as deep as sea",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "NAME",
      group_link: "",
      batch: "20",
    },
    {
      id: 11,
      name: "NAME '20",
      intro:
        "Embodied our notion, our concern is as vast as the ocean. Our sagacity is as deep as sea",
      institution: "BUET",
      image_link: "https://picsum.photos/200/300",
      department: "NAME",
      group_link: "",
      batch: "20",
    },
  ];

  let showable_groups = [];

  let search_term = "";

  $: {
    if (search_term) {
      // console.log(search_term);
      //filter groups based on search term, considering name, intro, institution, department, batch
      showable_groups = groups.filter((group) => {
        return (
          group.name.toLowerCase().includes(search_term.toLowerCase()) ||
          // group.intro.toLowerCase().includes(search_term.toLowerCase()) ||
          group.institution.toLowerCase().includes(search_term.toLowerCase()) ||
          group.department.toLowerCase().includes(search_term.toLowerCase()) ||
          group.batch.toLowerCase().includes(search_term.toLowerCase())
        );
      });
    } else {
      showable_groups = groups;
    }
  }
</script>

<!-- //table showing -->
<!-- <div
  class="overflow-x-auto relative shadow-md sm:rounded-lg py-10 px-10 w-3/4 mx-auto"
>
  <div class="pb-4 bg-white dark:bg-gray-900">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative mt-1">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.820 4.820a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          /></svg
        >
      </div>
      <input
        type="text"
        id="table-search"
        class="block p-2 pl-10 w-80 text-sm font-Roboto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for groups"
        bind:value={search_term}
      />
    </div>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" class="py-3 px-6 font-Roboto"> Group Name </th>
        <th scope="col" class="py-3 px-6 font-Roboto"> Institution </th>
        <th scope="col" class="py-3 px-6 font-Roboto"> Department </th>
        <th scope="col" class="py-3 px-6 font-Roboto"> Batch </th>
        <th scope="col" class="py-3 px-6 font-Roboto"> Link </th>
      </tr>
    </thead>
    <tbody>
      {#each showable_groups as group}
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium font-Roboto text-gray-900 whitespace-nowrap dark:text-white"
          >
            {group.name}
          </th>
          <td class="py-4  px-6 font-Roboto"> {group.institution} </td>
          <td class="py-4 px-6 font-Roboto"> {group.department} </td>
          <td class="py-4 px-6 font-Roboto"> {group.batch} </td>
          <td class="py-4 px-6 font-Roboto">
            <a
              href={group.link}
              class="font-medium font-Roboto text-blue-600 dark:text-blue-500 hover:underline"
              >Go</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div> -->

<!-- //card showing v1 -->
<!-- <div class="pt-5 bg-white dark:bg-gray-900 grid place-items-center">
  <label for="group-search" class="sr-only">Search</label>
  <div class="relative mt-1">
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
    >
      <svg
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.820 4.820a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        /></svg
      >
    </div>
    <input
      type="text"
      id="table-search"
      class="block p-2 pl-10 w-80 text-sm font-Roboto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search for groups"
      bind:value={search_term}
    />
  </div>
</div>
<div
  class="w-4/6 mx-auto grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 my-10 place-items-center"
>
  {#each showable_groups as group}
    <GroupCard {group} />
  {/each}
</div> -->

<!-- card showing v2 -->
<div class="py-10">
  <div class="pb-4 bg-white dark:bg-gray-900 grid place-items-center">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative mt-1">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.820 4.820a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          /></svg
        >
      </div>
      <input
        type="text"
        id="table-search"
        class="block p-2 pl-10 w-80 text-sm font-Roboto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for groups"
        bind:value={search_term}
      />
    </div>
  </div>
  <div class="grid grid-cols-3 m-3 w-4/6 mx-auto auto-rows-fr">
    {#each showable_groups as group}
      <GroupCard {group} />
    {/each}
  </div>
</div>
