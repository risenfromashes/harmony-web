import { createEventDispatcher } from "svelte";
import type { Message } from "../data/messages";
import type { PollEvent } from "../data/polls";
import type { PostEvent } from "../data/posts";
import { notifyTarget } from "./notifytarget";

export const createPollEventDispatch = (evs: EventSource) => {
  evs.addEventListener("poll", (e) => {
    let data: PollEvent = JSON.parse(e.data);
    console.log("Got event: ");
    console.log(data);
    notifyTarget.dispatchEvent(new CustomEvent("poll", { detail: data }));
  });
};
