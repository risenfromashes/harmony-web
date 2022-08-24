export interface Answer {
    answer_id: number;
    question_id: number;
    answer_title: string;
    answer_body: string; //will contain images if needed
    upvote: number;
    author: string;
    voted: number;
    //1 for upvoted, -1 for downvoted, 0 for not voted
    //stores if the current logged in user voted
}

