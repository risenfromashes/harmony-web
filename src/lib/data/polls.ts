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

export interface SendOption {
  index: number;
  title: string;
  description: string;
}

export interface UpdateOption {
  index: number;
  id: string;
  title: string;
  description: string;
}

export interface SendPoll {
  title: string;
  options: Array<SendOption>;
}

export interface UpdatePoll {
  id: string;
  title: string;
  options: Array<UpdateOption>;
}

export interface PollEvent {
  op: "add" | "delete" | "update";
  id: string;
  poll?: Poll;
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

export const addPoll = async (poll: SendPoll, gid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/add-poll", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      group_id: gid,
      title: poll.title,
      options: JSON.stringify(poll.options),
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.poll_id;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const updatePoll = async (poll: UpdatePoll, pid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch("/update-poll", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      poll_id: pid,
      title: poll.title,
      options: JSON.stringify(poll.options),
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.success;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const removePoll = async (pid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch("/remove-poll", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      poll_id: pid,
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.success;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const changeVote = async (pid: string, oid: string, add: boolean) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch("/change-vote", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      poll_id: pid,
      option_id: oid,
      add: add ? "t" : "f",
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.success;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};
