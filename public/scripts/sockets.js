
//This updates the list of users who are currently online 
socket.on("update user list", (userList) => {
  RenderAllUserElements(userList); 
});

socket.on("user-disconnected", (event)=>{
  console.log("client fired")
  const {
    message,
    UsersInChat, 
  } = event; 
  const chatItem = {
      msg: message, 
      username: '',
    }
  console.log("UserInChat: ", UsersInChat)
  RenderAllUserElements(UsersInChat); 
  RenderChatMessage(chatItem); 
})

socket.on("remove from list", (userId) => {
  RemoveUserFromList(userId);
  removeUserTypingNote(userId);
});

socket.on("chat message", (chatItem) => {
  RenderChatMessage(chatItem);
});

