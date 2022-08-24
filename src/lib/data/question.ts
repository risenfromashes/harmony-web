import type { Answer } from "./answer";


export interface Question {
    question_id: number;
    answers: Array<Answer>;
    // Probably the following two are not needed, but keeping them anyway for now
    question_group: string;//TF or whatever
    question_set: string;
    question_body: string;
}

