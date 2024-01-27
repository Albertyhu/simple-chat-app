const {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  createArrayOfUsers,
  isUsernameUnique,
} = require("../hooks/array.js");   
const { v4: uuidv4 } = require("uuid"); 

const AuthSockets = ({socket, ExistingSession}) =>{
  socket.on("new user", (newUser) => {
    const { username, TempKey } = newUser;
    io.emit(`checkusername-${TempKey}`, result);
  });
}

module.exports = AuthSockets; 