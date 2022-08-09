import { writable } from "svelte/store";

export interface Login{
    auth: boolean,
    user_id: String;
};

export let login = writable<Login>({auth: false, user_id: "-1"});