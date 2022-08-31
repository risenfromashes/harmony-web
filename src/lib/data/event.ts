import { navigate } from "svelte-navigator";
import { current_user } from "../stores/user";

export interface SendEvent {
  title: string;
  description: string;
  time: string;
}

export interface Event extends SendEvent {
  id: string;
}

export const getEvents = async (gid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch(`/get-events/${current_user.user_id}/${gid}`);

  if (res.ok) {
    let json = await res.json();
    return json as Event[];
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const addEvent = async (event: SendEvent, gid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }
  let res = await fetch("/add-event", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      group_id: gid,
      event_title: event.title,
      event_description: event.description,
      event_time: event.time,
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.event_id;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const updateEvent = async (event: Event) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch("/update-event", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      event_id: event.id,
      event_title: event.title,
      event_description: event.description,
      event_time: event.time,
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.success;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};

export const removeEvent = async (eid: string) => {
  if (!current_user.loggedIn) {
    navigate("/");
  }

  let res = await fetch("/remove-event", {
    method: "POST",
    body: JSON.stringify({
      user_id: current_user.user_id,
      event_id: eid,
    }),
  });

  if (res.ok) {
    let json = await res.json();
    return json.success;
  } else {
    if (res.status == 401) {
      navigate("/login");
    } else {
      throw new Error(res.status.toString());
    }
  }
};
