export interface Option {
    pollid: string;
    optionid: string;
    option_title: string;
    description: string;
    vote_count: number;
    width: number;
}

export interface Poll {
  id: string;
  title: string;
  options: Array<Option>;
  totalvote: number;
  votedOption: string;//-1 if not voted
}