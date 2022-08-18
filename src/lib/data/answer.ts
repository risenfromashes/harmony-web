export interface Answer {
    answerid: string;
    questionid: string;
    short_answer: string;
    answer_text: string;
    image_links: Array<string>;
    upvote: number;
    author: string;
    upvoted: boolean;//if the current user has upvoted already
}

