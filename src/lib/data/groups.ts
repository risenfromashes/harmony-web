import { current_user } from "../stores/user";
import { current_group, current_subject, groups } from "../stores/groups";
import { navigate } from "svelte-navigator";

export interface Subject {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  intro: string;
  image_link: string;
  group_link: string;
  subjects: Subject[];
}

export const getGroups = async () => {
  const res = await fetch(`/groups/${current_user.user_id}`);

  groups.update(() => []);
  current_group.update(() => undefined);
  current_subject.update(() => undefined);

  if (res.ok) {
    console.log("received groups");
    let body = await res.json();
    let new_groups: Group[] = [];
    for (let group of body) {
      let g: Group = {
        id: group.group_id,
        name: group.group_name,
        intro: group.intro,
        image_link: `https://source.unsplash.com/random/${group.group_id}`,
        group_link: "",
        subjects: group.subjects.map((s) => ({
          id: s.subject_id,
          name: s.subject_name,
        })),
      };
      new_groups.push(g);
    }
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
