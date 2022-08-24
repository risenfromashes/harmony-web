import { login } from "../stores/login";

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  time: Date;
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
