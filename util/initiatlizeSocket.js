const { v4: uuidv4 } = require("uuid"); 
const { SessionStore} = require("./session.js"); 
const {MessageStorage} = require("./messageStore.js"); 
const {
  ReceiveNewUser, 
} = require("../socket-methods/auth.js"); 
const {
  ReceiveInvite, 
  ReceiveJoinedPrivateChat, 
  ReceivePrivateChat,
  ReceiveTypingInPrivateChat, 
  ReceiveStopTypingInPrivateChat 
} = require("../socket-methods/private-chat.js"); 
const { 
  SessionMiddleware, 
  wrap, 
 } = require("../middlewares/sessionMiddleware.js")

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

//The wrap middleware serves the purpose of making express-session work with socket.io 
io.use(wrap(SessionMiddleware)); 
io.use((socket, next)=>{
  const sessionID = socket.request.session.instance; 

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
  socket.userID = uuidv4();  
  next();  
})

io.on("connection", (socket) => {
  var userMap = ExistingSession.returnAllSessionsAsArray();
  //io.emit("update user list", userMap);
  
  socket.on("chat message", (message) => {
    io.emit("chat message", message); 
  });

  ReceiveNewUser({io, socket, ExistingSession}); 

  socket.on("remove user", (userRemoved) => {
    var userID = onlineUsers.get(userRemoved);
    onlineUsers.delete(userRemoved);
    io.emit("remove from list", userID);
  });

  socket.on("disconnect", async () => {
    //var userN = getNameById(socket.id, onlineUsers);
    var disconnecting_session = ExistingSession.findSessionBySocketId(socket.id)
    var userN = disconnecting_session?.username; 
    var userId = disconnecting_session?.id; 

    var chatItem = { username: "", msg: `${userN} disconnected from chat` };
    io.emit("chat message", chatItem);
    var newUserMap = convertUserMapToArray(onlineUsers);

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

  //when a user is typing
  socket.on("user is typing", (userId) => {
    io.emit("user is typing", userId);
  });
  socket.on("no longer typing", (userId) => {
    io.emit("no longer typing", userId);
  });
  
  //when a user sends an invite for a private chat to another
  ReceiveInvite({io, socket, ExistingSession, messageStore}); 

  socket.on("accept-private-chat-invite", (roomKey)=>{
    socket.join(`room-${roomKey}`)
  })

  //when people join a private chat
  ReceiveJoinedPrivateChat({io, socket, ExistingSession, messageStore})

  //mesaging private chats 
  ReceivePrivateChat({io, socket, messageStore})

  //listen to when the user starts typing in chat
  ReceiveTypingInPrivateChat({io, socket}); 
  
  //listen to when user is no longer typing in private chat. 
  ReceiveStopTypingInPrivateChat({io, socket})
});
}

const AddSession = (username) =>{
    let session =  ExistingSession.findSessionByName(username)
    //create a new session if one doesn't exist; 
    if(!session || session === null || session === undefined){
        const newId = uuidv4(); 
        session = {
            id: newId,
            username,  
            connected: true, 
        }
        ExistingSession.saveSession(newId, session)
    console.log("new session: ", session)

    }
    return session; 
}

module.exports = {
    InitializeSocket,
    messageStore,
    ExistingSession, 
  }