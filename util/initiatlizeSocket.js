const { v4: uuidv4 } = require("uuid"); 
const { SessionStore} = require("./session.js"); 
const {MessageStorage} = require("./messageStore.js"); 

const {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  createArrayOfUsers,
  isUsernameUnique,
} = require("../hooks/array.js");    
const {
    genKey
} = require("../hooks/string.js") 

const ExistingSession = new SessionStore(); 
const messageStore = new MessageStorage(); 
var onlineUsers = new Map(); 

const InitializeSocket = (io) =>{
io.use((socket, next)=>{
  const sessionID = socket.handshake.auth.sessionId;
  if (sessionID) {
    // find existing session
    const session = ExistingSession.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  socket.sessionID = uuidv4();
  next();  
})

io.on("connection", (socket) => {
  var userMap = convertUserMapToArray(onlineUsers);
  io.emit("update user list", userMap);
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
  socket.on("new user", (newUser) => {
    const { username, TempKey } = newUser;
    let ValidName = false;
    if (isUsernameUnique(username, onlineUsers)) {
      var socketID = socket.id;
      onlineUsers.set(username, socketID);
      console.log("existing users: ", onlineUsers)
      var newUserMap = convertUserMapToArray(onlineUsers);
      io.emit("update user list", newUserMap);
      ValidName = true;
    }
    const result = {
      validity: ValidName,
      userSocketId: socketID,
      sessionId: socket.sessionID, 
    };
    console.log("online users: ", onlineUsers)
    io.emit(`checkusername-${TempKey}`, result);
  });

  socket.on("remove user", (userRemoved) => {
    var userID = onlineUsers.get(userRemoved);
    onlineUsers.delete(userRemoved);
    io.emit("remove from list", userID);

  });

  socket.on("disconnect", async () => {
    var userN = getNameById(socket.id, onlineUsers);
    onlineUsers = new Map(removeFromMap(socket.id, onlineUsers));
    var chatItem = { username: "", msg: `${userN} is disconnected` };
    io.emit("chat message", chatItem);
    var newUserMap = convertUserMapToArray(onlineUsers);
    io.emit("update user list", newUserMap);
    console.log("A user disconnected: ", socket.id)

    //needs code to check if user is disconnected from all existing chat rooms; 
    const matchingSockets = await io.in(socket.id).allSockets();
    console.log("matchingSockets: ", matchingSockets)
    const isDisconnected = matchingSockets.size === 0;
    if(matchingSockets.size === 0){
      ExistingSession.saveSession(socket.sessionID, {
          userID: socket.id, 
          connected:false, 
      })
    }

  });

  //when a user is typing
  socket.on("user is typing", (userN) => {
    io.emit("user is typing", onlineUsers.get(userN));
  });
  socket.on("no longer typing", (userN) => {
    io.emit("no longer typing", onlineUsers.get(userN));
  });
  
  //socket instence for when a someone once to send an invite 
  socket.on("chat-invite", (invite) => {
    const {
        inviter_name, 
        //socket.id of inviter
        inviter,
        //socket.id of invitee 
        invitee,
        roomKey, 
    } = invite; 
    socket.join(`room-${roomKey}`)
    //The variable 'invitee' is the socket id that is unique to the user.
    socket.to(invitee).emit(`invited-to-chat`, invite);
  });
  socket.on("accept-private-chat-invite", (roomKey)=>{
    socket.join(`room-${roomKey}`)
  })

  //notifies the server when a user joins a private chat room
  socket.on("joined-private-chat", async (event)=>{
    const { roomKey, username} = event; 
    const chatItem = {
      username: null, 
      msg: `${username} has joined the private chat room.`, 
      roomKey, 
      authorSocketId: null,      
    }
    //broadcast message to the chat room 
    socket.emit(`room-${roomKey}`, chatItem)

    //updates the number of users in the chat room; 
    const Ids = io.sockets.adapter.rooms.get(`room-${roomKey}`);
    const UsersInChat = createArrayOfUsers(Ids, onlineUsers)
    
    const matchingSockets = await io.in(socket.id).allSockets();
    console.log("matchingSockets: ", matchingSockets)

    socket.emit(`update-list-in-room-${roomKey}`, UsersInChat);  
  })
  socket.on("private-message", (event)=>{
    const {
      username, 
      msg, 
      roomKey, 
      authorSocketId, 
      date, 
    } = event;
    const room = `room-${roomKey}`; 
    io.emit(`room-${roomKey}`, event)
    messageStore(roomKey, username, authorSocketId, msg, date)
  })
  //when a user is typing in specific private chat room 
  socket.on(`typing private chat`, (event)=>{
    const {
        roomKey,
        username
    } = event; 
    io.emit(`user is typing-${roomKey}`, onlineUsers.get(username))
  })
  socket.on(`no longer typing in private chat`, (event)=>{
    const {
      roomKey,
      username, 
    } = event; 
    io.emit(`no longer typing-${roomKey}`, onlineUsers.get(username))
  })
});
}

module.exports = {
    InitializeSocket
  }