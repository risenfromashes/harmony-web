export interface Answer {
    answerid: string;
    questionid: string;
    short_answer: string;
    answer_text: string;
    image_links: Array<string>;
    upvote: number;
    author: string;
    voted: number;//1 for upvoted, -1 for downvoted, 0 for not voted
}

