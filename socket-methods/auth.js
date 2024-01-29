const {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  createArrayOfUsers,
  isUsernameUnique,
} = require("../hooks/array.js");   
const { v4: uuidv4 } = require("uuid"); 

/**Receiving from clients **/

//When the client indicates that it has successfully fetched info about the new user or a user who joined
//The server will broadcast a message that the user 'has joined the chat'. 
//It will also broadcast instructions for the client to update their list of online users. 

const ReceiveNewUser = ({io, socket, ExistingSession}) =>{
  socket.on("user info received", (newUser) => {
    const chatItem = {
      username: "", 
      msg: `${newUser.username} has joined the chat. `
    }
    console.log("ReceivedNewUser: ", socket.id)
    io.emit("chat message", chatItem)
    //save User's socket id to the system
    ExistingSession.updateUserSocketId(newUser.id, socket.id)
    UpdateClientOnlineList({io, ExistingSession})
  });
}

const UserLogOff = ({io, socket, ExistingSession}) =>{
  //client will pass the userId of the user to be removed from the list
  socket.on("log off", (userId)=>{
    ExistingSession.updateOnlineStatus(userId, false)
    io.emit("update user list", ExistingSession.returnAllSessionsAsArray())
  })
}

const DisconnectEvent = ({io, socket, ExistingSession}) =>{
 socket.on("disconnect", async () => {
    //var userN = getNameById(socket.id, onlineUsers);
    var disconnecting_session = ExistingSession.findSessionBySocketId(socket.id)
    var userN = disconnecting_session?.username; 
    var userId = disconnecting_session?.id; 

    var chatItem = { username: "", msg: `${userN} disconnected from chat` };
    io.emit("chat message", chatItem);

    //needs code to check if user is disconnected from all existing chat rooms; 
    const matchingSockets = await io.in(socket.id).allSockets();
    //console.log("matchingSockets: ", matchingSockets) 
    const isDisconnected = matchingSockets.size === 0;
    // let SessionId = socket.request.session.instance.id; 
    if(matchingSockets.size === 0 && disconnecting_session){
      ExistingSession.updateOnlineStatus(userId, false);
      var newUserMap = ExistingSession.returnAllSessionsAsArray(); 
      io.emit("update user list", newUserMap);
    }
  });  
}

/**broadcasting to clients **/
const UpdateClientOnlineList = ({io, ExistingSession}) =>{
  var updatedList = ExistingSession.returnAllSessionsAsArray(); 
  io.emit("update user list", updatedList)
}

module.exports = {
  ReceiveNewUser,  
  UpdateClientOnlineList, 
  UserLogOff,
  DisconnectEvent
} 