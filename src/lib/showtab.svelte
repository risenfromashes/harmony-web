<script lang="ts">
  import { selected_tab, type Tab } from "./stores/tab";
  export let tab: Tab;

  let style: string = "";
  $: {
    if ($selected_tab && $selected_tab === tab)
      style =
        "inline-block p-4 rounded-t-lg border-b-2 border-transparent text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500 text-base";
    else
      style =
        "inline-block p-4 rounded-t-lg border-b-2 dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300 text-base";
  }
</script>

<button
  class={style}
  id="profile-tab"
  data-tabs-target="#profile"
  type="button"
  role="tab"
  aria-controls="profile"
  aria-selected="false"
  on:click={() => {
    $selected_tab = tab;
  }}>{tab.name}</button
>
