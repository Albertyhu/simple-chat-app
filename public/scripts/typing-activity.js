input.addEventListener("keydown", (e) => {
  socket.emit("user is typing", username);
});

input.addEventListener("keyup", (e) => {
  if (!serverMessage.classList.contains("hideServerMessage")) {
    socket.emit("no longer typing", username);
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
