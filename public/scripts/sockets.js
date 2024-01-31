
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

//updates the list of existing chat rooms that the user is a member of
/*
  type ExistingChatRooms = {
    users: Array<obj>,
    roomKey: string, 
  } 
*/
socket.on("update-existing-chat-room-list", (ExistingChatRooms) =>{
  RenderExistingChatList(ExistingChatRooms)
})

socket.on("addAllChatRooms", (event)=>{

})

socket.on ("addUserToChat", (event)=>{
  
})