import { navigate } from "svelte-navigator";
import { current_group } from "../stores/groups";
import { current_user } from "../stores/user";

export interface Option {
  id: string;
  poll_id: string;
  title: string;
  description: string;
  vote_count: number;
  width: number;
}

export interface Poll {
  id: string;
  title: string;
  options: Array<Option>;
  total_vote: number;
  voted_option: string; //-1 if not voted
}

export const getPolls = async (gid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch(`/polls/${current_user.user_id}/${gid}`);

  if (res.ok) {
    let json = await res.json();
    return json as Poll[];
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};
