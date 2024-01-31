// var ToggleExistingRoomBtn = document.getElementById("ToggleExistingRoom"); 
// ToggleExistingRoomBtn.addEventListener("click", ()=>{
//     if(!MobileExistingRoomList.classList.contains("existing-rooms-list-closed")){
//         ToggleExistingRoomBtn.classList.remove("RototateExistingRoomBtn"); 
//         MobileExistingRoomList.classList.add("existing-rooms-list-closed")
//     }
//     else{
//         ToggleExistingRoomBtn.classList.add("RototateExistingRoomBtn"); 
//         MobileExistingRoomList.classList.remove("existing-rooms-list-closed")
//     }
// }) 

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

