<script lang="ts">
  import type { QuestionGroup } from "./data/questiongroup";
  import { useNavigate, useParams, Link } from "svelte-navigator";

  let question_groups: Array<QuestionGroup> = [
    {
      group_name: "Term Final",
      sets: [
        {
          set_name: "2019-20",
          questions: [
            {
              question_id: 1,
              answers: [],
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
              answers: [],
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
              answers: [],
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
              answers: [],
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

  //iterate over all question groups and set question_group to be group_name and question_set to be set_name
  question_groups.forEach((question_group) => {
    question_group.sets.forEach((set) => {
      set.questions.forEach((question) => {
        question.question_group = question_group.group_name;
        question.question_set = set.set_name;
      });
    });
  });

  const params = useParams();
</script>
