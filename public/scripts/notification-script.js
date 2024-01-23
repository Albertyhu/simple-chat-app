NotificationTab?.addEventListener("mousedown", (e) => {
  if (NotificationBody?.classList.contains("notification-body-closed")) {
    NotificationBody?.classList.remove("notification-body-closed");
  } else {
    NotificationBody?.classList.add("notification-body-closed");
  }
});

const CreateNotification = (message) => {
  var MessageDiv = document.createElement("div");
  MessageDiv.classList.add("notification-message");

  var Paragraph = document.createElement("p");
  Paragraph.innerHTML = message;

  var ButtonDiv = document.createElement("div");

  var AcceptBtn = document.createElement("button");
  AcceptBtn.classList.add("btn-primary");
  AcceptBtn.innerHTML = "Accept";

  var IgnoreBtn = document.createElement("button");
  IgnoreBtn.classList.add("btn-secondary");
  IgnoreBtn.innerHTML = "Ignore";

  ButtonDiv.appendChild(AcceptBtn);
  ButtonDiv.appendChild(IgnoreBtn);

  MessageDiv.appendChild(Paragraph);
  MessageDiv.appendChild(ButtonDiv);

  NotificationBody?.appendChild(MessageDiv);
};

socket.on(`invited-to-chat-${userSocketId}`, (invite) => {
  const { room, invitor } = invite;
  const Message = `${invitor} wants to chat`;
  CreateNotification(Message);
});
