const {v4:uuidv4} = require("uuid");
const { 
    messageStore,
    ExistingSession  
} = require("../util/initiatlizeSocket.js"); 
const { 
  MAIN_ROOM
} = require("../config/constants.js");
const {
  genKey, 
} = require("../hooks/string.js"); 
const {
  createRandomDate, 
} = require("../hooks/number.js"); 

//Adds user to public chat
//This is sends the necessary information to the client to render the page
const AddUser = (req, res, next) =>{
    const {username} = req.body; 
    //Check if the username is already registered with the site and has an existing session 
    let session =  ExistingSession.findSessionByName(username)
    let notifications = []; 
    const newId = uuidv4(); 
    //create a new session if one doesn't exist; 
    if(!session || session === null || session === undefined){

        session = {
            id: newId, 
            username,  
            connected: true, 
            //InviteNotification: new Map(), 
            InviteNotification: SampleNotifications, 
        }
        ExistingSession.saveSession(newId, session)   
    } else {
        console.log("old user")
        notifications = ExistingSession.getNotificationsByUserId(session.id)
    }
    try{
        chatHistory = messageStore.getChatHistoryById("PUBLIC")
    } catch(e){
        return res.status(500).json({error: e})
    }
    return res.status(200).json({session, messages: chatHistory, notifications})
}

const LogSession = (req, res) =>{
    const {id, status} = req.params; 
    try{ 
        ExistingSession.updateOnlineStatus(id, status)
        return res.status(200)
    } catch (e){
        console.error(e)
        return res.status(500).json({error: e})
    }
}

const AddUserInPrivateChat = (req, res) =>{
    const {username} = req.body; 
    const {roomKey} = req.params; 
    //Check if the username is already registered with the site and has an existing session 
    let session =  ExistingSession.findSessionByName(username);
    let notifications = []; 
    //create a new session if one doesn't exist; 
    var sessionId = null; 
    if(!session){
        sessionId = uuidv4(); 
        session = {
            id: sessionId, 
            username,  
            connected: true, 
            InviteNotification: new Map(), 
        }
        ExistingSession.saveSession(sessionId, session)
    }
    else{
        sessionId = session.id
        notifications = ExistingSession.getNotificationsByUserId(session.id)
    }
    var chatHistory = []; 
    try{
        chatHistory = messageStore.getChatHistoryById(roomKey)
    } catch(e){
        return res.status(500).json({error: e})
    }
    return res.status(200).json({sessionInfo: session, messages: chatHistory, notifications})
}

//obsolete
const RetrieveChat = ( req, res )=>{
    const {roomKey} = req.params; 
    var chatHistory = []; 
    try{
        chatHistory = messageStore.getChatHistoryById(roomKey)
    } catch(e){
        return res.status(400).json({error: e})
    }
    return res.status(200).json({messages: chatHistory})
}

module.exports = {
    AddUser, 
    LogSession,
    AddUserInPrivateChat, 
    RetrieveChat
} 


var SampleNotifications = new Map()

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false, 
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false, 
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})

SampleNotifications.set(genKey(10), {
  roomKey: genKey(10), 
  time: createRandomDate(),   
  inviter_name: "Sample name", 
  inviter: genKey(10), 
  seen: false,   
  id: genKey(10), 
})