import { writable, type Writable } from "svelte/store";
import type { Group, Subject } from "../data/groups";

export const groups: Writable<Group[]> = writable<Group[]>([]);

export const current_group: Writable<Group> = writable<Group>(undefined);
export const current_subject: Writable<Subject> = writable<Subject>(undefined);
