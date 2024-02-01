//chat input functions
const submitEvent = (e) => {
  e.preventDefault();
  var dateObj = new Date();
  const chatItem = {
    username: Session.username,
    id: Session.sessionId, 
    msg: input.value,
    roomKey: roomKey, 
    date: dateObj, 
  };
  if (input.value) {
    socket.emit("private-message", chatItem);
    input.value = "";
  }
};

chatform.addEventListener("submit", submitEvent);

document.addEventListener("keypress", (e) => {
  if (e.code == 13) {
    submitEvent(e);
  }
});

