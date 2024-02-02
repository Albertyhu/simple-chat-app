//This updates the list of users who are currently online 
socket.on("update user list", (userList) => {
  RenderAllUserElements(userList); 
});

//updates the list of existing chat rooms that the user is a member of
/*
  type ExistingChatRooms = {
    users: Array<obj>, 
    roomKey: string, 
  } 
*/
//This is called when the current user joins a chat room 
socket.on("addAllUserChatRooms", (ExistingChatRooms)=>{
//You need to save ExistingChatRooms to the clients class ChatRooms first
    ExistingChatRooms.forEach(item =>{
        CurrentUserChatRooms.addChatRoom(item.room_key, item.users)
    })
  RenderExistingChatList(ExistingChatRooms)
})

//This is called when another users joins a chatroom that the current user is a member of 
socket.on ("addUserToChatRoom", (event)=>{
  const {
    username, 
    room_key, 
  } = event; 
  //update record of chatrooms that user is in 
  CurrentUserChatRooms.addSingleUserToChatRoom(room_key, username)
  //re-render elements of the UI 
  RenderExistingChatList(CurrentUserChatRooms.getAllChatRooms())
})
