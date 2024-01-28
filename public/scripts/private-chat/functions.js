const genKey = (size) => {
  var key = "";
  for (var i = 0; i < size; i++) {
    key += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return key;
};

//replaces whitespaces in a string with underscore character
function replaceWhiteSpaces(inputString) {
  return inputString.replace(/\s/g, "_");
}

const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};

const RenderMessage = (chatItem)=>{
  var item = document.createElement("li");
  if (chatItem.username) {
    var divElement = document.createElement("div");
    divElement.classList.add("usernameDiv");
    var user_name = document.createElement("p");
    user_name.innerText = chatItem.username;
    user_name.classList.add("usernameStyle");
    divElement.append(user_name);

    var time = document.createElement("p"); 
    time.innerText = new Date(chatItem.date); 
    time.style.fontStyle = "italic";
    divElement.append(time);
    item.append(divElement);
    ChatHistory.recordMessage(chatItem.msg, chatItem.username, chatItem.authorSocketId, chatItem.date)
  }
  var message = document.createElement("p");
  message.innerText = chatItem.msg;

  item.append(message);
  messages.appendChild(item);
}

//responsible for creating sessions for users 
//Need to work on emiting message to server that user is online so his username gets put under "online users" in the menu
const AuthenticateUsername = async (userN) =>{
  await fetch("/auth/add-user", {
    method: "POST",
    body: JSON.stringify({
      username: userN, 
    }),
    headers: {
      "Content-Type": "application/json", 
    }
  })
  .then(async response => await response.json())
  .then(result =>{
    Session.saveSessionInfo(result.username, result.id, true)
    if (!LoginForm.classList.contains("closeForm"))
      LoginForm.classList.add("closeForm");
    AddUserElem(result.username);
    //save session info in client side 
    Session.saveSessionInfo(result.username, result.id, true)

    socket.emit("user info received", result)
    socket.emit("joined-private-chat", {roomKey, username: Session.username})
  })
  .catch(error => {console.log("error: ", error)})
}


