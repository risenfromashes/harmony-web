  import { writable, type Writable } from "svelte/store";
  export const selected_tab_id: Writable<number> = writable<number>(undefined);
