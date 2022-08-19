import { login } from "../stores/login";

export interface Post {
  id: string;
  text: string;
  time: Date;
  poster_id: string;
  poster_name: string;
  group_id: string;
}

export const getPosts = async () => {
  const res = await fetch(`/posts/${login.user_id}`);

  if (res.ok) {
    console.log("received posts");
    let body = await res.json();
    let posts: Post[] = [];
    for (let post of body) {
      let p: Post = {
        id: post.post_id,
        text: post.post_text,
        time: new Date(post.time),
        poster_id: post.poster_id,
        poster_name: post.poster_name,
        group_id: post.group_id,
      };
      posts.push(p);
    }
    return posts;
  } else {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else {
      console.log("unexpected status: " + res.status);
      console.log({ res });
      throw new Error("Unexpected status");
    }
  }
};
