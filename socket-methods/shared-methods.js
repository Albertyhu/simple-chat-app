
const UpdateUserChatRoomList = (socket, username, userId, ExistingSession, messageStore, room_key) =>{
    const ExistingChatRooms = messageStore.getChatRoomsUserIsIn(userId, ExistingSession); 
    //Broadcast to all relevant users who are members of the same chat room 
    //It sends the roomKey to all clients, the clients check if they are members of the chatRoom that has that roomKey 
    socket.emit("addAllUserChatRooms", ExistingChatRooms)    
    socket.broadcast.emit("addUserToChatRoom", {username, room_key})
}

module.exports = {
    UpdateUserChatRoomList, 
 }