import { createEventDispatcher } from "svelte";
import type { Message } from "../data/messages";
import type { PostEvent } from "../data/posts";
import { notifyTarget } from "./notifytarget";

export const createPostEventDispatch = (evs: EventSource) => {
  evs.addEventListener("post", (e) => {
    let data: PostEvent = JSON.parse(e.data);
    console.log("Got event: ");
    console.log(data);
    notifyTarget.dispatchEvent(new CustomEvent("post", { detail: data }));
  });
};
