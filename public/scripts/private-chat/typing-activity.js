//const Room is declared in main.js 

input.addEventListener("keydown", (e) => {
  const event = {
    roomKey,
    username, 
  } 
  socket.emit(`typing private chat`, event);
});

input.addEventListener("keyup", (e) => {
  const event = {
    roomKey,
    username, 
  } 
  if (!serverMessage.classList.contains("hideServerMessage")) {
    socket.emit(`no longer typing in private chat`, event);
  }
});

socket.on(`user is typing-${roomKey}`, (ID) => {
  const typingNote = document.getElementById(`typing-${ID}`);
  typingNote.classList.remove("hideServerMessage");
});
socket.on(`no longer typing-${roomKey}`, (ID) => {
  const typingNote = document.getElementById(`typing-${ID}`);
  typingNote.classList.add("hideServerMessage");
});
