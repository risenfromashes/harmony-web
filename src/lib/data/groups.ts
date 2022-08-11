import { login } from "../stores/login";

export interface Group {
  id: string;
  name: string;
  intro: string;
  image_link: string;
  group_link: string;
}

export const get_groups = async () => {
  const res = await fetch(`/groups/${login.user_id}`);

  if (res.ok) {
    console.log("received groups");
    let body = await res.json();
    let groups = [];
    for (let group of body) {
      groups.push({
        id: group.group_id,
        name: group.group_name,
        intro: group.intro,
        image_link: `https://source.unsplash.com/random/${group.group_id}`,
        group_link: "",
      });
    }
    return groups;
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
