input.addEventListener("keydown", (e) => {
  socket.emit("user is typing", Session.sessionId);
});

input.addEventListener("keyup", (e) => {
  if (!serverMessage.classList.contains("hideServerMessage")) {
    socket.emit("no longer typing", Session.sessionId);
  }
});

socket.on("user is typing", (ID) => {
  const typingNote = document.getElementById(`typing-${ID}`);
  typingNote.classList.remove("hideServerMessage");
});
socket.on("no longer typing", (ID) => {
  const typingNote = document.getElementById(`typing-${ID}`);
  typingNote.classList.add("hideServerMessage");
});
