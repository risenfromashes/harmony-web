export interface CommentReply {
  id: string;
  text: string;
  time: Date;
  commenter_id: string;
  commenter_name: string;
  post_id: string;
  subcomments?: CommentReply[];
}
