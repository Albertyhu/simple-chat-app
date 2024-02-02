//elements for rendering the notification panel 
const NotificationTab = document.getElementById("notification-header");
const NotificationBody = document.getElementById("notification-body");
const NotificationCount = document.getElementById("notification-count")

const options = {
  threshold: 0.1, 
}

const NoteObserver = new IntersectionObserver(entries=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      let noteId = entry.target.id.replace("noteId-", ""); 
      socket.emit("Update notification status", {
        userId: Session.userId, 
        noteId, 
        seen: true
      })
      DecrementNotification(); 
      //setTimeout(()=>{
        entry.target.classList.remove("unread-notification")
      //}, 500)
      NoteObserver.unobserve(entry.target)
    }
  })
}, options)

//needs work 
const IncrementNotification = () => {
  //var newNotification = localStorage.getItem("new_notification")
  Session.incrementNotificationCount();  
  //localStorage.setItem("new_notification", newNotification)
  NotificationCount.innerHTML = `&nbsp; (${Session.inviteNotificationCount})`
  NotificationCount.style.fontWeight = "bold"; 
}

const DecrementNotification = () => {
  //var newNotification = localStorage.getItem("new_notification")
  //newNotification++; 
  Session.decrementNotificationCount();  
  //localStorage.setItem("new_notification", newNotification)
  NotificationCount.innerHTML = `&nbsp; (${Session.inviteNotificationCount})`
  NotificationCount.style.fontWeight = "bold"; 
}

//needs 
const SetNotificationNumber = (num) =>{
  NotificationCount.innerHTML = `&nbsp; (${num})`; 
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

const RespondToPrivateChatInvite = (roomKey, noteId, accepted) =>{
  //ResetNotificationCount(); 
  if (!NotificationBody?.classList.contains("notification-body-closed")) {
      NotificationBody?.classList.add("notification-body-closed");
    }
  const acceptedInvite = {
    roomKey, 
    userId: Session.sessionId, 
    noteId,
    accepted,  
  }
  socket.emit("respond-to-private-chat-invite", acceptedInvite)
  window.open(`/private-chat/${roomKey}`, "_blank"); 
}



//Creates notification for the invitee notifying him that someone wants to chat with him 
const CreateChatInviteNotification = (inviter, roomKey, time, noteId, seen) => {
  IncrementNotification();  
  var MessageDiv = document.createElement("div");
  MessageDiv.classList.add("notification-message");  
  MessageDiv.setAttribute("id", `noteId-${noteId}`)
  if(!seen){
    MessageDiv.classList.add("unread-notification"); 
  }

  var Paragraph = document.createElement("p");
  Paragraph.innerHTML = `${inviter} wants to chat`;

  var ButtonDiv = document.createElement("div");

  var AcceptBtn = document.createElement("button");
  AcceptBtn.classList.add("btn-primary");
  AcceptBtn.innerHTML = "Accept";
  AcceptBtn.addEventListener("click", ()=>{
    RespondToPrivateChatInvite(roomKey, noteId, true);
    NotificationBody?.removeChild(MessageDiv); 
  })


  var IgnoreBtn = document.createElement("button");
  IgnoreBtn.classList.add("btn-secondary");
  IgnoreBtn.innerHTML = "Ignore";
  IgnoreBtn.addEventListener("click", ()=>{
    //ResetNotificationCount()
    RespondToPrivateChatInvite(roomKey, noteId, false);
    NotificationBody?.removeChild(MessageDiv)
  })
  ButtonDiv.appendChild(AcceptBtn);
  ButtonDiv.appendChild(IgnoreBtn);

  let DateDiv = document.createElement("div");
  let dateTime = new Date(time)
  DateDiv.innerHTML = dateTime.toLocaleString(); 
  MessageDiv.appendChild(DateDiv)

  MessageDiv.appendChild(Paragraph);
  MessageDiv.appendChild(ButtonDiv);

  //makes sure that newest notifications are inserted before the oldest ones 
  //so that the notifications are in descending order
  if(NotificationBody.firstChild){
    NotificationBody?.insertBefore(MessageDiv, NotificationBody.firstChild);
  }
  else{
    NotificationBody?.appendChild(MessageDiv);
  }



  NoteObserver.observe(MessageDiv); 
};

const RemoveNotification = (child, parent) =>{
  parent.removeChild(child)
}

socket.on(`invited-to-chat`, (invite) => {
  const {
      inviter_name, 
      //socket.id of inviter
      inviter,
      //socket.id of invitee 
      invitee,
      roomKey, 
      time, 
      noteId, 
      seen, 
  } = invite;   
  console.log("Invited to chat: ", invite)
  CreateChatInviteNotification(inviter_name, roomKey, time, noteId, false);
});
