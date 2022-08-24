<script lang="ts">
  //   import { useNavigate, useParams, Link } from "svelte-navigator";
  import { Router, Route, Link, useParams } from "svelte-navigator";
  import type { QuestionGroup } from "../lib/data/question_group";
  import SingleFolderView from "../lib/singlefolderview.svelte";

  let question_groups: Array<QuestionGroup> = [
    {
      group_name: "Term Final",
      sets: [
        {
          set_name: "2019-20",
          questions: [
            {
              question_id: 1,
              answers: [
                {
                  answer_id: 1,
                  answer_title: "I want to answer this question",
                  answer_body:
                    "Traffic jams are very common in every country, especially in big cities. Because in big cities the population, as well as the number of vehicles, are very high. Therefore, with the increasing number of vehicles and overuse of roads, traffic jams are occurring alarmingly. Like other developing countries, traffic jams are also a major problem in Bangladesh as well. People are stuck for hours in a traffic jam; also the situation is getting worse day by day.",
                  upvote: 55,
                  author: "Lord Shattik",
                  voted: 0,
                  question_id: -1,
                },
              ],
              question_group: "",
              question_set: "",
              question_body: "What is a Turing Machine?",
            },
          ],
        },
      ],
    },
    {
      group_name: "Assignment",
      sets: [
        {
          set_name: "2019-20",
          questions: [
            {
              question_id: 1,
              answers: [
                {
                  answer_id: 1,
                  answer_title: "I want to answer this question",
                  answer_body:
                    "Traffic jams are very common in every country, especially in big cities. Because in big cities the population, as well as the number of vehicles, are very high. Therefore, with the increasing number of vehicles and overuse of roads, traffic jams are occurring alarmingly. Like other developing countries, traffic jams are also a major problem in Bangladesh as well. People are stuck for hours in a traffic jam; also the situation is getting worse day by day.",
                  upvote: 55,
                  author: "Lord Siam",
                  voted: 0,
                  question_id: -1,
                },
              ],
              question_group: "",
              question_set: "",
              question_body: "Design a Turing Machine",
            },
          ],
        },
      ],
    },
    {
      group_name: "Lab Quiz",
      sets: [
        {
          set_name: "2019-20",
          questions: [
            {
              question_id: 1,
              answers: [
                {
                  answer_id: 1,
                  answer_title: "I want to answer this question",
                  answer_body:
                    "Traffic jams are very common in every country, especially in big cities. Because in big cities the population, as well as the number of vehicles, are very high. Therefore, with the increasing number of vehicles and overuse of roads, traffic jams are occurring alarmingly. Like other developing countries, traffic jams are also a major problem in Bangladesh as well. People are stuck for hours in a traffic jam; also the situation is getting worse day by day.",
                  upvote: 55,
                  author: "Lord Ashraf",
                  voted: 0,
                  question_id: -1,
                },
              ],
              question_group: "",
              question_set: "",
              question_body: "Write a query showing rank of all employees",
            },
          ],
        },
      ],
    },
    {
      group_name: "Mid Term",
      sets: [
        {
          set_name: "2019-20",
          questions: [
            {
              question_id: 1,
              answers: [
                {
                  answer_id: 1,
                  answer_title: "I want to answer this question",
                  answer_body:
                    "Traffic jams are very common in every country, especially in big cities. Because in big cities the population, as well as the number of vehicles, are very high. Therefore, with the increasing number of vehicles and overuse of roads, traffic jams are occurring alarmingly. Like other developing countries, traffic jams are also a major problem in Bangladesh as well. People are stuck for hours in a traffic jam; also the situation is getting worse day by day.",
                  upvote: 55,
                  author: "Lord Nafis",
                  voted: 0,
                  question_id: -1,
                },
              ],
              question_group: "",
              question_set: "",
              question_body:
                "Derive the Fourier Series Expansion of the following function",
            },
          ],
        },
      ],
    },
  ];

  //iterate over all question groups and set question_group to be group_name and question_set to be set_name and question_id to be question_id
  question_groups.forEach((question_group) => {
    question_group.sets.forEach((set) => {
      set.questions.forEach((question) => {
        question.answers.forEach((answer) => {
          answer.question_id = question.question_id;
        });
        question.question_group = question_group.group_name;
        question.question_set = set.set_name;
      });
    });
  });

  function get_question_sets(group_name: string) {
    console.log(group_name);
    let sets: Array<string> = [];
    question_groups.forEach((question_group) => {
      if (question_group.group_name === group_name) {
        question_group.sets.forEach((set) => {
          sets.push(set.set_name);
        });
      }
    });
    console.log(group_name, sets);
    return sets;
  }

  const params = useParams();
  console.log($params);
</script>

<Router>
  <div class="bg-slate-900 pt-20 pl-10 pr-3 my-5">
    <Route>
      {#each question_groups as question_group}
        <SingleFolderView name={question_group.group_name} />
      {/each}
    </Route>
    <Route path=":group_name" let:params>
      {#each get_question_sets(params.group_name) as set}
        <SingleFolderView name={set} />
      {/each}
    </Route>
  </div>
</Router>
