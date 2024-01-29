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
  var item = document.createElement("li");
  if (chatItem.username) {
    var divElement = document.createElement("div");
    divElement.classList.add("usernameDiv");
    var user_name = document.createElement("p");
    user_name.innerText = chatItem.username;
    user_name.classList.add("usernameStyle");
    divElement.append(user_name);

    var dateObj = new Date(chatItem.timeSubmitted);

    var time = document.createElement("p");
    time.innerText = dateObj;
    time.style.fontStyle = "italic";
    divElement.append(time);
    item.append(divElement);
  }
  var message = document.createElement("p");
  message.innerText = chatItem.msg;

  item.append(message);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
