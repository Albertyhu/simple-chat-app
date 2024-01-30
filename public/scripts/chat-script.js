const submitEvent = (e) => {
  e.preventDefault();
  const chatItem = {
    username: Session.username,
    id: Session.id, 
    msg: input.value,
  };
  if (input.value) {
    socket.emit("chat message", chatItem);
    input.value = "";
  }
};
chatform.addEventListener("submit", submitEvent);

document.addEventListener("keypress", (e) => {
  if (e.code == 13) {
    submitEvent(e);
  }
});

socket.on("chat message", (chatItem) => {
  RenderChatMessage(chatItem);
});
