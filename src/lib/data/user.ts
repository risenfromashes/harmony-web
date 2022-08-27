import { navigate } from "svelte-navigator";
import { current_user } from "../stores/user";

export interface UserHandle {
  id: string;
  user_name: string;
}

export interface User extends UserHandle {
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  joined: Date;
  dp_id: string;
  dp_link: string;
}

export const loadUserHandles = async (): Promise<UserHandle[]> => {
  let res = await fetch(`/users/${current_user.user_id}`);
  if (res.ok) {
    let body = await res.json();
    return body as UserHandle[];
  } else if (res.status == 401) {
    navigate("/login");
  } else {
    throw new Error(res.statusText);
  }
};
