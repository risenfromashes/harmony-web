import { writable } from "svelte/store";
import { createSource } from "../events/createSource";

class Login {
  private event_source: EventSource = undefined;
  private id: string = undefined;

  private closeEventSource() {
    if (this.event_source != undefined) {
      this.event_source.close();
    }
  }

  private updateEventSource(id: string) {
    this.closeEventSource();
    if (Number.parseInt(id) > 0) {
      this.event_source = createSource(id);
    }
  }

  public get user_id(): string {
    if (this.id == undefined) {
      let rt = window.localStorage.getItem("user_id");
      this.updateEventSource(rt);
      this.id = rt;
    }
    return this.id != null ? this.id : "-1";
  }

  public set user_id(id: string) {
    window.localStorage.setItem("user_id", id);
    this.updateEventSource(id);
    this.id = id;
  }
}

export let login = new Login();
