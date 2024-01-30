socket.on(`update-list-in-room-${roomKey}`, (UsersInChat) => {
  RenderAllUserElements(UsersInChat)
});

socket.on(`user-disconnected-${roomKey}`, (event)=>{
  const {
    messages, 
    UsersInChat, 
  } = event; 
  RenderAllUserElements(userList); 
})

socket.on("remove from list", (userId) => { 
  RemoveUserFromList(userId);
  removeUserTypingNote(userId);
});
