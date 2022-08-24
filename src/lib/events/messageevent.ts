import { createEventDispatcher } from "svelte";
import type { Message } from "../data/messages";
import { notifyTarget } from "./notifytarget";

export const createGroupMessageDispatch = (evs: EventSource, dispatcher) => {
  evs.addEventListener("chat", (e) => {
    let data: Message = JSON.parse(e.data);
    data.time = new Date(data.time);
    console.log("Got event: ");
    console.log(data);
    notifyTarget.dispatchEvent(
      new CustomEvent("group-message", { detail: data })
    );
  });
};
