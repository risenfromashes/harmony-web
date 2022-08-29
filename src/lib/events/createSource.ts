import { createGroupMessageDispatch } from "./messageevent";
import { createPostEventDispatch } from "./postevent";

export function createSource(user_id: string) {
  const evs = new EventSource("/events/" + user_id);
  evs.onopen = (e) => {
    console.log("Event source openned");
  };

  createGroupMessageDispatch(evs);
  createPostEventDispatch(evs);

  return evs;
}
