const AddUserElem = (userN) => {
  MenuHeader.style.display = "block";
  MenuHeader.innerHTML = `<p>You are logged in as</p><p><b>${userN}</b></p>`;
  LogoutLink.style.display = "block";
  chatform.style.display = "flex";
};

const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};

const Logout = () => {
  MobileMenu.classList.add("closed-menu");
  var userN = localStorage.getItem("username");
  var chatItem = {
    username: "",
    msg: `${userN} is now disconnected`,
  };
  socket.emit("chat message", chatItem);
  localStorage.removeItem("username");

  RemoveUserElem();
  const LoginForm = document.getElementById("login-form");
  LoginForm.classList.remove("closeForm");

  socket.emit("remove user", UsernameInput.value);
};

//adds a username to the list of users who are currently online
const AddUserToList = (userN, ID) => {
  const userLi = document.createElement("li");
  userLi.classList.add("listItemStyle");
  userLi.setAttribute("id", `id-${ID}`);
  userLi.innerText = userN;
  UserList.append(userLi);

  if (username != userN) {
    userLi.style.cursor = "pointer";
    openInviteBox(userN, ID, userLi);
  }
};

const RemoveUserFromList = (ID) => {
  const target = document.getElementById(`id-${ID}`);
  if (target) UserList.removeChild(target);
};

//opens box to invite a user
const openInviteBox = (invitee, ID, parentElem) => {
  const InviteBox = document.createElement("div");
  InviteBox.classList.add("inviteBox");
  InviteBox.classList.add("hideInviteBox");
  InviteBox.setAttribute("id", `invite-${ID}`);

  const paragraph = document.createElement("p");
  paragraph.innerText = `Invite ${invitee} to a private chat?`;

  const BtnDiv = document.createElement("div");
  BtnDiv.classList.add("btnDiv");

  const YesButton = document.createElement("button");
  YesButton.classList.add("btn-primary");
  YesButton.innerText = "Yes";
  YesButton.addEventListener("click", () => {
    const roomKey = genKey(20); 
    const inviteObj = {
      inviter_name: username, 
      inviter: userSocketId,
      invitee: ID,
      room: `room-${roomKey}`, 
      roomKey, 
    }
    socket.emit(`chat-invite`, inviteObj);
    InviteBox.classList.add("hideInviteBox");
    window.open(`/private-chat/${roomKey}`); 
  });

  const NoButton = document.createElement("button");
  NoButton.classList.add("btn-secondary");
  NoButton.innerText = "No";
  NoButton.addEventListener("click", () => {
    InviteBox.classList.add("hideInviteBox");
  });

  BtnDiv.appendChild(YesButton);
  BtnDiv.appendChild(NoButton);

  InviteBox.appendChild(paragraph);
  InviteBox.appendChild(BtnDiv);
  parentElem.appendChild(InviteBox);
  parentElem.addEventListener("mousedown", () => {
    InviteBox.classList.remove("hideInviteBox");
  });
};

//Create elment for notifying user when a user is typing
const addUserTypingNote = (userN, ID) => {
  var UserTypingNote = document.createElement("p");
  UserTypingNote.classList.add("hideServerMessage");
  UserTypingNote.innerText = `${userN} is typing...`;
  UserTypingNote.setAttribute("id", `typing-${ID}`);
  serverMessage.appendChild(UserTypingNote);
};

//Remove element that is responsible for notifying when the user is typing
const removeUserTypingNote = (ID) => {
  var removeNode = document.getElementById(`typing-${ID}`);
  serverMessage.removeChild(removeNode);
};

socket.on("update user list", (userList) => {
  OnlineUsers = userList;
  UserList.innerHTML = "";
  serverMessage.innerHTML = "";
  userList.forEach((user) => {
    AddUserToList(user.username, user.id);
    addUserTypingNote(user.username, user.id);
  });
});

socket.on("remove from list", (userId) => {
  RemoveUserFromList(userId);
  removeUserTypingNote(userId);
});

