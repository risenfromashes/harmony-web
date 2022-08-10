import { writable } from "svelte/store";

class Login {
  public get user_id(): string {
    let rt = window.localStorage.getItem("user_id");
    return rt != null ? rt : "-1";
  }

  public set user_id(id: string) {
    window.localStorage.setItem("user_id", id);
  }
}

export let login = new Login();
