  import { writable, type Writable } from "svelte/store";
  export const selected_tab_id: Writable<number> = writable<number>(1); //this will be the feed page of the current selected group, and subject
