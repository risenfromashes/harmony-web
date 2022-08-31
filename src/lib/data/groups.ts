import { current_user } from "../stores/user";
import { current_group, current_subject, groups } from "../stores/groups";
import { navigate } from "svelte-navigator";
import type { UserHandle } from "./user";
import { createGroupMessageDispatch } from "../events/messageevent";

export interface Subject {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  access: "member" | "admin";
  intro: string;
  image_id: string;
  image_link: string;
  subjects: Subject[];
}

export const getGroups = async () => {
  const res = await fetch(`/groups/${current_user.user_id}`);

  groups.update(() => []);
  current_group.update(() => undefined);
  current_subject.update(() => undefined);

  if (res.ok) {
    console.log("received groups");
    let new_groups: Group[] = await res.json();
    groups.update(() => new_groups);

    if (new_groups.length > 0) {
      current_group.update(() => new_groups[0]);
      if (new_groups[0].subjects.length > 0) {
        current_subject.update(() => new_groups[0].subjects[0]);
      }
    }
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

export let loadGroups = async () => {
  try {
    await getGroups();
  } catch (e) {
    navigate("/login");
  }
};

export let loadGroupsDev = async () => {
  return null;
};

export let addGroup = async (
  creator: string,
  name: string,
  intro: string,
  members: UserHandle[]
) => {
  if (creator == "-1") return;
  let res = await fetch("/add-group", {
    method: "POST",
    body: JSON.stringify({
      creator_id: creator,
      name: name,
      intro: intro,
      members: `{${members.map((m) => m.id).join(",")}}`,
    }),
  });

  if (res.ok) {
    await loadGroups();
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.statusText);
  }
};

export let updateGroup = async (
  gid: string,
  name: string,
  intro: string,
  photo_id: string
) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/update-group", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      group_id: gid,
      name: name,
      intro: intro,
      photo_id: photo_id,
    }),
  });

  if (res.ok) {
    let ret = await res.json();
    return ret.success;
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};

export const loadMembers = async (gid: string): Promise<UserHandle[]> => {
  let res = await fetch(`/members/${current_user.user_id}/${gid}`);
  if (res.ok) {
    let body = await res.json();
    return body as UserHandle[];
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};

export const updateMember = async (mid: string, gid: string, add: boolean) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/update-member", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      member_id: mid,
      group_id: gid,
      add: add ? "t" : "f",
    }),
  });

  if (res.ok) {
    let ret = await res.json();
    return ret.success;
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};

export const addSubject = async (gid: string, name: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/add-subject", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      group_id: gid,
      name: name,
    }),
  });

  if (res.ok) {
    let ret = await res.json();
    return ret.subject_id;
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};

export const removeSubject = async (gid: string, sid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/remove-subject", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      subject_id: sid,
      group_id: gid,
    }),
  });

  if (res.ok) {
    let ret = await res.json();
    return ret.success;
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};

export const removeGroup = async (gid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/remove-group", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      group_id: gid,
    }),
  });

  if (res.ok) {
    let ret = await res.json();
    return ret.success;
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.status.toString());
  }
};
