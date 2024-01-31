socket.on(`update-list-in-room-${roomKey}`, (UsersInChat) => {
  RenderAllUserElements(UsersInChat)
});
console.log("client RoomKey: ", roomKey) 

socket.on("remove from list", (userId) => { 
  RemoveUserFromList(userId);
  removeUserTypingNote(userId);
});

socket.on(`room-${roomKey}-chat-history`, (chatHistory)=>{
  console.log('chatHistory.size: ', chatHistory.length)
  if(chatHistory != null && chatHistory != undefined){
    chatHistory.forEach(item => {RenderMessage(item)})
  }
})

//used for receiving chat messages from server 
socket.on(Room, (chatItem) => {
  RenderMessage(chatItem)
  window.scrollTo(0, document.body.scrollHeight);
});

const UserDisconnectReceiver = `user-disconnected-${roomKey}`; 

socket.on(UserDisconnectReceiver , (event)=>{
  const {
    message, 
    UsersInChat
  } = event; 
  const chatItem = {
      msg: message, 
      username: '',
    }
  RenderChatMessage(chatItem) 
  RenderAllUserElements(UsersInChat);      
})
