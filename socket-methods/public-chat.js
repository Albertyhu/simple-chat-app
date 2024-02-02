const { printSocketRooms } = require('../hooks/array.js'); 
const {genKey} = require("../hooks/string.js"); 
const {
    UpdateUserChatRoomList,
    ChooseWhosClientListToUpdate
} = require("./shared-methods.js"); 

const PublicSocketMethods = ({MAIN_ROOM, io, socket, ExistingSession, messageStore}) =>{

    //When the client indicates that it has successfully fetched info about the new user or a user who joined
    //The server will broadcast a message that the user 'has joined the chat'. 
    //It will also broadcast instructions for the client to update their list of online users. 
    const ReceiveNewPublicUser = () =>{
        socket.on("user info received", (newUser) => {
            const chatItem = { 
            username: "", 
            msg: `${newUser.username} has joined the chat. ` 
            }
            io.emit("chat message", chatItem) 

            //check to see if the user is previously offline, which means he is not in any chat rooms 
            //the function checks the chat rooms for any of the user's sockets. 
            //This has to be done before the user is added to messageStore
            let wasOffline = !messageStore.isUserOnline(newUser.id)

            //printSocketRooms(socket, newUser.username) 
            //add user to storage
            messageStore.addUserToRoom(MAIN_ROOM, newUser.id, socket.id, true)

            //save User's socket id to the system
            ExistingSession.updateUserSocketId(newUser.id, socket.id)

            //update the chat rooms that the sure is in 
            //Broadcast to other users who are in the same chatroom
            UpdateUserChatRoomList(socket, newUser.username, newUser.id, ExistingSession, messageStore, MAIN_ROOM)
            
            //Choose between updating everyone's list of online users or just the current user's 
            ChooseWhosClientListToUpdate({wasOffline, io, socket, ExistingSession, messageStore})
        });
    }
    
    const ReceivePublicChatMess = () =>{
        socket.on("chat message", (message) => {
            const timeSubmitted = new Date(); 
            const {
            username,
            id, 
            msg,
            } = message; 
            message.timeSubmitted = timeSubmitted; 
            messageStore.saveMessages(MAIN_ROOM, username, id, msg, timeSubmitted)
            io.emit("chat message", message); 
        });
    }

    const PublicUserTyping = () =>{
        //when a user is typing
        socket.on("user is typing", (userId) => { 
            io.emit("user is typing", userId);
        });
    }
    
    const PublicNoLongerTyping = () =>{
        socket.on("no longer typing", (userId) => {
            io.emit("no longer typing", userId);
        });
    }

    return {
        ReceiveNewPublicUser , 
        ReceivePublicChatMess, 
        PublicUserTyping, 
        PublicNoLongerTyping
    }
}

module.exports = PublicSocketMethods; 