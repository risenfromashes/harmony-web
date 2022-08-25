import { navigate } from "svelte-navigator";
import { login } from "../stores/login";

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  time: Date;
}

export interface SendMessage {
  group_id: string;
  subject_id: string;
  content: string;
}

interface SendMessageBody {
  user_id: string;
  group_id: string;
  subject_id: string;
  content: string;
}

export const getGroupMessages = async (
  group_id: string,
  subject_id: string
) => {
  const res = await fetch(
    `/group-messages/${login.user_id}/${group_id}/${subject_id}`
  );

  if (res.ok) {
    let body = await res.json();

    console.log("received messages");
    console.log(body);

    let messages: Message[] = [];
    for (let m of body) {
      let p: Message = {
        id: m.message_id,
        sender_id: m.sender_id,
        sender_name: m.sender_name,
        content: m.content,
        time: new Date(m.time),
      };
      messages.push(p);
    }
    return messages;
  } else {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else {
      console.log("unexpected status: " + res.status);
      console.log({ res });
      throw new Error("Unexpected status");
    }
  }
};

export const postGroupMessage = async (msg: SendMessage) => {
  const body: SendMessageBody = {
    user_id: login.user_id,
    group_id: msg.group_id,
    subject_id: msg.subject_id,
    content: msg.content,
  };

  const res = await fetch("/group-message", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.ok) {
    let body = await res.json();
    console.log("Sent message: ");
    console.log(body);
    return body.message_id;
  } else {
    if (res.status === 401) {
      navigate("/login");
    } else {
      console.log("Unexpected status: " + res.status);
      console.log({ res });
      throw new Error("Unexpected status");
    }
  }
};
