const session = require("express-session")
const {v4:uuidv4} = require("uuid")
const { 
    messageStore,
    ExistingSession  
} = require("../util/initiatlizeSocket.js"); 

const AddUser = (req, res, next) =>{
    const {username} = req.body; 
    //Check if the username is already registered with the site and has an existing session 
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
    }
    req.session.instance = session; 
    console.log("set: ", ExistingSession.returnAllSession())
    return res.status(200).json(session)
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

module.exports = {
    AddUser, 
    LogSession 
} 