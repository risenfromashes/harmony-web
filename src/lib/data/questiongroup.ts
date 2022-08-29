import type { Question } from "./question"

export interface QuestionSet { 
    //2019-2020 TF set A is a question set
    //it will contain 1a, 1b etc.
    set_name: string;
    questions: Array<Question>; //answers are embedded in question data type
}

export interface QuestionGroup { //TF is a question group
    group_name: string,
    sets: Array<QuestionSet> //so this array will contain
}

