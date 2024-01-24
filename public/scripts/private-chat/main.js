const Room = `room-${roomKey}`

socket.emit("joined-private-chat", {roomKey, username})

//The variable 'roomKey' will be passed from the server to the private-message.ejs file and can be used as a global variable
ToggleExistingRoomBtn.addEventListener("click", ()=>{
    if(!MobileExistingRoomList.classList.contains("existing-rooms-list-closed")){
        ToggleExistingRoomBtn.classList.remove("RototateExistingRoomBtn"); 
        MobileExistingRoomList.classList.add("existing-rooms-list-closed")
    }
    else{
        ToggleExistingRoomBtn.classList.add("RototateExistingRoomBtn"); 
        MobileExistingRoomList.classList.remove("existing-rooms-list-closed")
    }
}) 

//chat input functions
const submitEvent = (e) => {
  e.preventDefault();
  const chatItem = {
    username: username,
    authorSocketId: userSocketId, 
    msg: input.value,
    roomKey: roomKey, 
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

socket.on(Room, (chatItem) => {
  console.log("chatItem: ", chatItem)
  var item = document.createElement("li");
  if (chatItem.username) {
    var divElement = document.createElement("div");
    divElement.classList.add("usernameDiv");
    var user_name = document.createElement("p");
    user_name.innerText = chatItem.username;
    user_name.classList.add("usernameStyle");
    divElement.append(user_name);

    var dateObj = new Date();

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