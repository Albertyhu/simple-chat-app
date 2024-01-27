const session = require("express-session")
const {v4:uuidv4} = require("uuid")
const { 
    messageStore,
    ExistingSession  
} = require("../util/initiatlizeSocket.js"); 


const AddUser = (req, res, next) =>{
    const {username} = req.body; 
    let session =  ExistingSession.findSessionByName(username)
    //create a new session if one doesn't exist; 
    if(!session || session === null || session === undefined){
        session = {
            username,  
            connected: true, 
        }
        const newId = uuidv4(); 
        ExistingSession.saveSession(newId, session)
    }
    req.session = session.instance; 
    return session 
}

const LogSession = (req, res) =>{
    const {id, status} = req.params; 
    try{ 
        ExistingSession.updateOnlineStatus(id, status)
    } catch (e){
        console.error(e)
    }
}

module.exports = {
    AddUser, 
    LogSession 
} 