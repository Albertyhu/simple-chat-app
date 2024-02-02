
const UpdateUserChatRoomList = (socket, username, userId, ExistingSession, messageStore, room_key) =>{
    const ExistingChatRooms = messageStore.getChatRoomsUserIsIn(userId, ExistingSession); 
    //Broadcast to all relevant users who are members of the same chat room 
    //It sends the roomKey to all clients, the clients check if they are members of the chatRoom that has that roomKey 
    socket.emit("addAllUserChatRooms", ExistingChatRooms)    
    socket.broadcast.emit("addUserToChatRoom", {username, room_key})
}

    
//This updates the list of users who are currently online 
//Before this function can be called, the app has to check if the user is already in any of the chat rooms 
const UpdateEveryonesClientOnlineList  = ({io, ExistingSession}) =>{
    let updatedList = ExistingSession.returnAllSessionsAsArray(); 
    //console.log("UpdateEveryonesClientOnlineList  updatedList: ", updatedList)
    io.emit("update user list", updatedList)
}

const UpdateCurrentUserClientOnlineList = ({socket, ExistingSession, messageStore}) =>{
    let updatedList = messageStore.getAllOnlineUsers(ExistingSession)
    socket.emit("update user list", updatedList)
}

const ChooseWhosClientListToUpdate = ({wasOffline, io, socket, ExistingSession, messageStore}) =>{
    if(wasOffline){
        //This updates the list of users who are currently online 
        UpdateEveryonesClientOnlineList({io, ExistingSession})
    }
    else{
        //only update the user's list of online people 
        UpdateCurrentUserClientOnlineList({socket, ExistingSession, messageStore})
    }    
}

const RemoveNotification = ({io, ExistingSession}) =>{
    io.on("Remove Notification", (event)=>{
        const {
            userId, 
            noteId, 
        } = event; 
        ExistingSession.removeNotification(userId, noteId); 
    })

}

const UpdateNoteStatus = ({io, ExistingSession}) =>{
    io.on("Update notification status", (event)=>{
        const {
            userId,
            //noteId: Array<string>
            noteId, 
            seen, 
        } = event; 
        console.log("updateNotificationView event ", event)
        //only use this if you want to update note status in mass 
        // noteIds.forEach(id => {
        //     ExistingSession.updateNotificationView(userId, id, seen); 
        // })
        ExistingSession.updateNotificationView(userId, noteId, seen);
    })
}

module.exports = {
    UpdateUserChatRoomList, 
    UpdateEveryonesClientOnlineList ,
    UpdateCurrentUserClientOnlineList, 
    ChooseWhosClientListToUpdate,
    UpdateNoteStatus,  
 }