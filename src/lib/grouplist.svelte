<script lang="ts">
  //declare an array of groups with id name, institution, department, batch and link to group page
  //later take this from database
  export const groups = [
    {
      id: 1,
      name: "The Avengers",
      institution: "BUET",
      department: "CSE",
      batch: "'20",
      link: "/group/1",
    },
    {
      id: 2,
      name: "Rock and Roll",
      institution: "BUET",
      department: "MME",
      batch: "'19",
      link: "/group/2",
    },
    {
      id: 3,
      name: "DU Flarez",
      institution: "Dhaka University",
      department: "SWE",
      batch: "'18",
      link: "/group/3",
    },
    {
      id: 4,
      name: "JU Politicians",
      institution: "Jahangirnagar University",
      department: "Political Science",
      batch: "'17",
      link: "/group/4",
    },
    {
      id: 5,
      name: "NDC",
      institution: "Notre Dame College",
      department: "N/A",
      batch: "'19",
      link: "/group/5",
    },
    {
      id: 6,
      name: "Group 6",
      institution: "BUET",
      department: "EEE",
      batch: "'16",
      link: "/group/6",
    },
    {
      id: 7,
      name: "Archi '17",
      institution: "CUET",
      department: "Architecture",
      batch: "'17",
      link: "/group/7",
    },
    {
      id: 8,
      name: "Newbies",
      institution: "BRAC University",
      department: "CSE",
      batch: "'18",
      link: "/group/8",
    },
    {
      id: 9,
      name: "BUET CSE 19",
      institution: "BUET",
      department: "CSE",
      batch: "'19",
      link: "/group/9",
    },
  ];

  let showable_groups = [];

  let search_term = "";

  $: {
    if (search_term) {
      //filter groups based on search term
      showable_groups = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(search_term.toLowerCase()) ||
          group.institution.toLowerCase().includes(search_term.toLowerCase()) ||
          group.department.toLowerCase().includes(search_term.toLowerCase()) ||
          group.batch.toLowerCase().includes(search_term.toLowerCase())
      );
    } else {
      showable_groups = groups;
    }
  }
</script>

<div
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
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
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
</div>
