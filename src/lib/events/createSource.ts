export function createSource(user_id: string) {
  const evs = new EventSource("/events/" + user_id);
  evs.onopen = (e) => {
    console.log("Event source openned");
  };
  evs.addEventListener("chat", (e) => {
    console.log("Received chat event");
    console.log(`data: ${e.data}`);
  });

  return evs;
}
