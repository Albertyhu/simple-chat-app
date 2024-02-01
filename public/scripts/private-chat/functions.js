

const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};

const TestChat = () =>{
  const num1 = Math.random() * 100; 
  const num2 = Math.random() * 100; 

  const SampleItems = [
    {
      username: Session.username,
      id: Session.sessionId, 
      msg: `This is a test message ${num1}`,
      roomKey: roomKey, 
      date: new Date(), 
    }, 
    {
      username: Session.username,
      id: Session.sessionId, 
      msg: `This is a test message ${num2}`,
      roomKey: roomKey, 
      date: new Date(), 
    }, 
  ]

  SampleItems.forEach(item =>{
    socket.emit("private-message", item);
  })
}

/**
 * 
 * type chatItem = {
 *  username: string, 
 *  msg: string,
 *  time: Date, 
 * }
 */

const RenderMessage = (chatItem)=>{
  var item = document.createElement("li");
  if (chatItem.username) {
    var divElement = document.createElement("div");
    divElement.classList.add("usernameDiv");
    var user_name = document.createElement("p");
    user_name.innerText = chatItem.username;
    user_name.classList.add("usernameStyle");
    divElement.append(user_name);
    console.log("chatItem: ", chatItem)
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
const AuthenticateUsername = async (userN, roomKey) =>{
  await fetch(`/private-chat/load-user/${roomKey}`, {
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
    const {
      sessionInfo,
      messages, 
    } = result; 
    Session.saveSessionInfo(sessionInfo.username, sessionInfo.id, true)
    const LoginForm = document.getElementById("login-form");
    if (!LoginForm.classList.contains("closeForm"))
      LoginForm.classList.add("closeForm");
    AddUserElem(sessionInfo.username);

    //This code is problematic because it shares the same broadcast name as the public one
    //save session info in client side 
    //socket.emit("user info received", sessionInfo)
    socket.emit("joined-private-chat", {roomKey, username: Session.username, id: Session.sessionId})
    messages?.forEach(chatItem =>{
      RenderMessage(chatItem)
    })
  })
  .catch(error => {console.log("error: ", error)})
}
