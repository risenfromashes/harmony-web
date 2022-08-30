import { navigate } from "svelte-navigator";
import { current_group } from "../stores/groups";
import { current_user } from "../stores/user";
import type { QlDelta } from "../utilities/qlDeltaRenderer";

export interface PostContent {
  type: string;
  data: string;
}

export interface Post {
  id: string;
  time: string;
  poster_id: string;
  poster_name: string;
  poster_dp_link: string;
  content: PostContent;
  comments: Post[];
}

export interface PostEvent extends Post {
  group_id: string;
  subject_id: string;
  parent_post_id: string;
}

export interface SendPost {
  poster_id: string;
  group_id: string;
  subject_id: string;
  parent_post_id: string;
  type: string;
  content: string | QlDelta;
}

export interface PostResponse {
  post_id: string;
}

export const getPosts = async (gid: string, sid: string, pid: string) => {
  const res = await fetch(
    `/posts/${current_user.user_id}/${gid}/${sid}/${pid}`
  );

  if (res.ok) {
    console.log("received posts");
    let body = await res.json();
    return body;
  } else {
    if (res.status === 401) {
      navigate("/login");
    } else {
      console.log("unexpected status: " + res.status);
      console.log({ res });
      throw new Error("Unexpected status");
    }
  }
};

export const addPost = async (post: SendPost) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/post", {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    let json = await res.json();
    return json as PostResponse;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};
