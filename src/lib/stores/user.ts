import { writable } from "svelte/store";
import type { User } from "../data/user";
import { createSource } from "../events/createSource";

class CurrentUser {
  private id: string;
  private event_source: EventSource = undefined;

  constructor(uid: string) {
    this.id = uid;
    if (this.id == undefined) {
      this.id = "-1";
    }
  }

  public get loggedIn(): boolean {
    return this.id && this.id != "-1";
  }

  public async fetchInfo() {
    let res = await fetch(`/user-info/${this.id}`);
    let info = await res.json();
    if (res.ok) {
      return info;
    } else {
      throw new Error(info.reason);
    }
  }

  async login(username: string, password: string) {
    let req = { user_name: username, password: password };
    let res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(req),
    });
    const body = await res.json();

    if (res.ok) {
      this.user_id = body.id;
    } else {
      throw new Error(body.reason);
    }
  }

  private closeEventSource() {
    if (this.event_source != undefined) {
      this.event_source.close();
    }
  }

  private updateEventSource(id: string) {
    this.closeEventSource();
    if (id && id != "-1") {
      this.event_source = createSource(id);
    }
  }

  public get user_id(): string {
    return this.id;
  }

  private set user_id(id: string) {
    window.localStorage.setItem("user_id", id);
    this.id = id;
    this.updateEventSource(id);
  }
}

export const current_user = new CurrentUser(
  window.localStorage.getItem("user_id")
);
