import { writable, type Writable } from "svelte/store";

export interface Tab {
  name: string;
  icon: string;
  link: string;
}

export let tabs = [
  { name: "Feed", icon: "", link: "/home/feed" },
  { name: "Polls", icon: "", link: "/home/polls" },
  { name: "Events", icon: "", link: "/home/events" },
  // { name: "Archive", icon: "", link: "/home/archive" },
  { name: "Chats", icon: "", link: "/home/chats" },
];

export const selected_tab: Writable<Tab> = writable<Tab>(tabs[0]); //this will be the feed page of the current selected group, and subject
