import type { Answer } from "./answer";


export interface Question {
    questionid: string;
    answers: Array<Answer>;
    question_type: string;//TF or whatever
    question_year: string;
    statement: string;
}

