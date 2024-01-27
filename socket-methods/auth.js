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
    io.emit("chat message", chatItem)
  UpdateClientOnlineList({io, ExistingSession})
  });
}

const UserLogOff = ({io, socket, ExistingSession}) =>{
  //client will pass the username of the user to be removed from the list
  socket.on("log off", (userId)=>{
    ExistingSession.updateOnlineStatus(userId, false)
    io.emit("update user list", ExistingSession.returnAllSessionsAsArray())
  })
}

/**broadcasting to clients **/
const UpdateClientOnlineList = ({io, ExistingSession}) =>{
  var updatedList = ExistingSession.returnAllSessionsAsArray(); 
  console.log("updated list: ", updatedList)
  io.emit("update user list", updatedList)
}

module.exports = {
  ReceiveNewUser, 
  UpdateClientOnlineList, 
  UserLogOff
} 