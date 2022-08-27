<script lang="ts">
  import FaIcon from "./faIcon.svelte";
  import type { Group, Subject } from "./data/groups";
  import { current_subject, current_group } from "./stores/groups";

  export let group: Group;
  export let subject: Subject;

  let isCurrent = false;

  $: {
    if ($current_group && $current_subject) {
      isCurrent =
        $current_group.id === group.id && $current_subject.id === subject.id;
    }
  }

  const handleClick = () => {
    $current_group = group;
    $current_subject = subject;
    console.log("current_group", $current_group);
    console.log("current_subject", $current_subject);
  };
</script>

<div
  class={"cursor-default w-auto m-2 h-10 flex items-center pl-8 hover:border hover:border-slate-600 text-base rounded" +
    (isCurrent ? " bg-slate-700 font-bold" : "")}
  on:click={handleClick}
>
  <FaIcon className="text-white" icon="flask" />
  <p class="ml-4">
    {subject.name}
  </p>
</div>
