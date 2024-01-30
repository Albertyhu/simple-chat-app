const { v4: uuidv4 } = require("uuid"); 
const { SessionStore} = require("./session.js"); 
const {MessageStorage} = require("./messageStore.js"); 
const {
  DisconnectEvent, 
} = require("../socket-methods/auth.js"); 
const {
  ReceiveInvite, 
  ReceiveAcceptanceToInvite, 
  ReceiveJoinedPrivateChat, 
  ReceivePrivateChat,
  ReceiveTypingInPrivateChat, 
  ReceiveStopTypingInPrivateChat 
} = require("../socket-methods/private-chat.js"); 
const { 
  SessionMiddleware, 
  wrap, 
 } = require("../middlewares/sessionMiddleware.js")
const PublicSocketMethods = require("../socket-methods/public-chat.js")
const { 
  MAIN_ROOM
} = require("../config/constants.js")


const ExistingSession = new SessionStore(); 
const messageStore = new MessageStorage(); 

//create message storage with an empty arraya and "PUBLIC" as the key

const InitializeSocket = (io) =>{
messageStore.createStorage(MAIN_ROOM, [])

//The wrap middleware serves the purpose of making express-session work with socket.io 
io.use(wrap(SessionMiddleware)); 

io.on("connection", (socket) => {   
const {
    ReceiveNewPublicUser,
    ReceivePublicChatMess, 
    PublicUserTyping, 
    PublicNoLongerTyping
} = PublicSocketMethods({MAIN_ROOM, io, socket, ExistingSession, messageStore})
  //Add new user to the chat when he joins 
  ReceiveNewPublicUser(); 

  //handles submitting chat message to public room  
  ReceivePublicChatMess(); 

  //broadcasts notice that a user is typing 
  PublicUserTyping();  

  //broadcasts notice that a user is no longer typing 
  PublicNoLongerTyping(); 

  //Handles tasks when a user disconnects 
  DisconnectEvent({io, socket, ExistingSession, messageStore})

  //when a user sends an invite for a private chat to another
  ReceiveInvite({io, socket, ExistingSession, messageStore}); 

  //when a user accepts an invite
  ReceiveAcceptanceToInvite({socket})
  
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