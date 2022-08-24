import { createGroupMessageDispatch } from "./messageevent";

export function createSource(user_id: string) {
  const evs = new EventSource("/events/" + user_id);
  evs.onopen = (e) => {
    console.log("Event source openned");
  };

  createGroupMessageDispatch(evs);

  return evs;
}
