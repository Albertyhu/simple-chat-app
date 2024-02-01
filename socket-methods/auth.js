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
    messageStore.disconnectMessage(io, socket, ExistingSession)
  });  
}

module.exports = {
  UserLogOff,
  DisconnectEvent
} 