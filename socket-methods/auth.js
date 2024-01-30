/**Receiving from clients **/
const UserLogOff = ({io, socket, ExistingSession}) =>{
  //client will pass the userId of the user to be removed from the list
  socket.on("log off", (userId)=>{
    ExistingSession.updateOnlineStatus(userId, false)
    io.emit("update user list", ExistingSession.returnAllSessionsAsArray())
  })
}

//For this to work, it's going to require recording every single socket.id and chat room id 
//that is generating from a new chat room
//The information will be stored in MessageStorage 
const DisconnectEvent = ({io, socket, ExistingSession, messageStore}) =>{
 socket.on("disconnect", () => {
    var disconnecting_session = ExistingSession.findSessionBySocketId(socket.id)
    var userN = disconnecting_session?.username; 
    var userId = disconnecting_session?.id; 
    // var chatItem = { username: "", msg: `${userN} disconnected from chat` };
    // io.emit("chat message", chatItem);
    messageStore.disconnectMessage(io, socket, ExistingSession)
  });  
}

/**broadcasting to clients on public chat**/
const UpdateClientOnlineList = ({io, ExistingSession}) =>{
  var updatedList = ExistingSession.returnAllSessionsAsArray(); 
  io.emit("update user list", updatedList)
}

module.exports = {
  UpdateClientOnlineList, 
  UserLogOff,
  DisconnectEvent
} 