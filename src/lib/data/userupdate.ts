import type { User } from "./user";

export interface UserUpdate extends User {
  password: string;
}
