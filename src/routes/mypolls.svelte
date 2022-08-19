<script lang="ts">
  import Pollitem from "../lib/pollitem.svelte";
  import type { Poll } from "../lib/data/polls";
  import { beforeUpdate, afterUpdate } from "svelte";

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    console.log(div.scrollHeight);
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  //declare an array of 5 Poll Objects
  let polls: Poll[] = [
    {
      id: "1",
      title: "Poll 1",
      options: [
        {
          pollid: "1",
          optionid: "1",
          option_title: "Option 1",
          description: "This is some option that you may check out",
          vote_count: 5,
          width: 0,
        },
        {
          pollid: "1",
          optionid: "2",
          option_title: "Option 2",
          description: "This is some option that you may check out",
          vote_count: 5,
          width: 0,
        },
        {
          pollid: "1",
          optionid: "3",
          option_title: "Option 3",
          description: "This is some option that you may check out",
          vote_count: 10,
          width: 0,
        },
      ],
      totalvote: 0,
      votedOption: "-1",
    },
    {
      id: "2",
      title: "Poll 2",
      options: [
        {
          pollid: "2",
          optionid: "1",
          option_title: "Option 1",
          description: "This is some option that you may check out",
          vote_count: 4,
          width: 0,
        },
        {
          pollid: "2",
          optionid: "2",
          option_title: "Option 2",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "2",
          optionid: "3",
          option_title: "Option 3",
          description: "This is some option that you may check out",
          vote_count: 1,
          width: 0,
        },
      ],
      totalvote: 0,
      votedOption: "-1",
    },
    {
      id: "3",
      title: "Poll 3",
      options: [
        {
          pollid: "3",
          optionid: "1",
          option_title: "Option 1",
          description: "This is some option that you may check out",
          vote_count: 8,
          width: 0,
        },
        {
          pollid: "3",
          optionid: "2",
          option_title: "Option 2",
          description: "This is some option that you may check out",
          vote_count: 9,
          width: 0,
        },
        {
          pollid: "3",
          optionid: "3",
          option_title: "Option 3",
          description: "This is some option that you may check out",
          vote_count: 1,
          width: 0,
        },
      ],
      totalvote: 0,
      votedOption: "-1",
    },
    {
      id: "4",
      title: "Poll 4",
      options: [
        {
          pollid: "4",
          optionid: "1",
          option_title: "Option 1",
          description: "This is some option that you may check out",
          vote_count: 1,
          width: 0,
        },
        {
          pollid: "4",
          optionid: "2",
          option_title: "Option 2",
          description: "This is some option that you may check out",
          vote_count: 11,
          width: 0,
        },
        {
          pollid: "4",
          optionid: "3",
          option_title: "Option 3",
          description: "This is some option that you may check out",
          vote_count: 5,
          width: 0,
        },
      ],
      totalvote: 0,
      votedOption: "-1",
    },
    {
      id: "5",
      title: "Poll 5",
      options: [
        {
          pollid: "5",
          optionid: "1",
          option_title: "Option 111111111111111111",
          description: "This is some option that you may check out",
          vote_count: 1,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "2",
          option_title: "Option 2",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "3",
          option_title: "Option 3",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "4",
          option_title: "Option 4",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "5",
          option_title: "Option 5",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "6",
          option_title: "Option 6",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "7",
          option_title: "Option 7",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
        {
          pollid: "5",
          optionid: "8",
          option_title: "Option 8",
          description: "This is some option that you may check out",
          vote_count: 0,
          width: 0,
        },
      ],
      totalvote: 0,
      votedOption: "-1",
    },
  ];

  polls.forEach((p) => {
    p.totalvote = 0;
    for (let i = 0; i < p.options.length; i++) {
      p.totalvote += p.options[i].vote_count;
    }
  });

  function deletePoll(id: string) {
    console.log("got delete request for poll with id: " + id);
    const index = polls.findIndex((p) => p.id === id);
    console.log(index);
    if (index === -1) return;
    polls.splice(index, 1);
    polls = polls;
  }
</script>

<div class="bg-slate-900">
  <div class="w-3/4 p-10 my-10 flex-1 mx-auto" bind:this={div}>
    {#each polls as poll}
      <Pollitem {poll} {deletePoll} />
    {/each}
  </div>
</div>
