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

socket.on(`room-${roomKey}-chat-history`, (chatHistory)=>{
  console.log('chatHistory.size: ', chatHistory.length)
  if(chatHistory != null && chatHistory != undefined){
    chatHistory.forEach(item => {RenderMessage(item)})
  }
})

socket.on(Room, (chatItem) => {
  RenderMessage(chatItem)
  window.scrollTo(0, document.body.scrollHeight);
});