const IncrementNotification = () => {
  var newNotification = localStorage.getItem("new_notification")
  newNotification++; 
  localStorage.setItem("new_notification", newNotification)
  NotificationCount.innerHTML = `&nbsp; (${newNotification})`
  NotificationCount.style.fontWeight = "bold"; 
}

const ResetNotificationCount = () =>{
  NotificationCount.innerHTML = "&nbsp; (0)"; 
  localStorage.setItem("new_notification", 0)
  NotificationCount.style.fontWeight = "regular"; 
}

NotificationTab?.addEventListener("mousedown", (e) => {
  ResetNotificationCount()
  if (NotificationBody?.classList.contains("notification-body-closed")) {
    NotificationBody?.classList.remove("notification-body-closed");
  } else {
    NotificationBody?.classList.add("notification-body-closed");
  }
});

const AcceptPrivateChatInvite = (roomKey) =>{
  ResetNotificationCount(); 
  if (!NotificationBody?.classList.contains("notification-body-closed")) {
      NotificationBody?.classList.add("notification-body-closed");
    }
  socket.emit("accept-private-chat-invite", roomKey)
  window.open(`/private-chat/${roomKey}`, "_blank"); 
}

//Creates notification for the invitee notifying him that someone wants to chat with him 
const CreatePrivateNotification = (inviter, roomKey) => {
  var MessageDiv = document.createElement("div");
  MessageDiv.classList.add("notification-message");

  var Paragraph = document.createElement("p");
  Paragraph.innerHTML = `${inviter} wants to chat`;

  var ButtonDiv = document.createElement("div");

  var AcceptBtn = document.createElement("button");
  AcceptBtn.classList.add("btn-primary");
  AcceptBtn.innerHTML = "Accept";
  AcceptBtn.addEventListener("click", ()=>{
    AcceptPrivateChatInvite(roomKey);
    NotificationBody?.removeChild(MessageDiv); 
  })


  var IgnoreBtn = document.createElement("button");
  IgnoreBtn.classList.add("btn-secondary");
  IgnoreBtn.innerHTML = "Ignore";
  IgnoreBtn.addEventListener("click", ()=>{
    ResetNotificationCount()
    NotificationBody?.removeChild(MessageDiv)
  })
  ButtonDiv.appendChild(AcceptBtn);
  ButtonDiv.appendChild(IgnoreBtn);

  MessageDiv.appendChild(Paragraph);
  MessageDiv.appendChild(ButtonDiv);

  NotificationBody?.appendChild(MessageDiv);
};

const RemoveNotification = (child, parent) =>{
  parent.removeChild(child)
}

socket.on(`invited-to-chat`, (invite) => {
  IncrementNotification();  
  const {
      inviter_name, 
      //socket.id of inviter
      inviter,
      //socket.id of invitee 
      invitee,
      roomKey, 
  } = invite;   
  CreatePrivateNotification(inviter_name, roomKey);
});
