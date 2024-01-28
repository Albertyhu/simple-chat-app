const { convertUserMapToArrays } = require("../hooks/array.js")

/**
 * type session ={
 *  id: string, 
 *  username: string, 
 *  connected: boolean, 
 *  socketId: string, 
 * }
 * 
 */
 
class SessionStore{
  constructor(){
    this.sessions = new Map(); 
  }
  findSession(id) {
    return this.sessions.get(id);
  }
  updateUserSocketId(id, newSocketID){
    var session = this.sessions.get(id);
    session.socketId = newSocketID; 
    this.sessions.set(id, session)
  }
  getUserSocketId(id){
    var session = this.sessions.get(id)
    return session.socketId; 
  }
  findSessionByName(username){
    let user = null; 
    this.sessions.forEach(session =>{
        if(session?.username === username.trim()){
            user = session; 
        }
    })
    return user; 
  }
  findSessionBySocketId(socketId){
    let session = null
    this.sessions.forEach(item =>{
      if(item.socketId === socketId){
        session = item; 
      }
    })
    return session; 
  }
  findIDByName(name){
    let id = null; 
    try{
      this.sessions.forEach((item, key)=>{
        if(item.username === name){
          id = key; 
        }
      })
      return id; 
    }catch(e){console.log("error: ", e)}
  }
  getName(id){
    return this.sessions.find(id).username
  }
  getNameBySocketId(socketId){
    let name = null;
    this.sessions.forEach(item =>{
      if(item.socketId === socketId){
        name = item.username; 
      }
    })
    return name; 
  }
  changeName(id, newName){
    let updateSession = this.session.get(id)
    updateSession.username = newName;
    this.session.set(id, updateSession); 
  }
  removeUser(id){
    this.session.delete(id); 
  }
  removeUserByName(name){
    var id = this.findIDByName(name)
    if(id){
      this.session.delete(id)
    }
    else{
      throw new Error("There is no existing user that goes by that user name")
    }
  }
  saveSession(id, session) {
    this.sessions.set(id, session);
  }
  updateOnlineStatus(id, status){
    let session = this.sessions.get(id);
    if(session){
      session.connected = status; 
      this.sessions.set(id, session); 
    }
    else{
      throw new Error ("User doesn't exist")
    }
  }
  returnAllSession(){
    return this.sessions; 
  }
  returnAllSessionsAsArray() {
    var arr = [];  
    this.sessions.forEach((value, key)=>{
      const obj = {
        id: key, 
        username: value.username, 
        connected: value.connected,
        socketId: value.socketId, 
      }
      arr.push(obj)
    })
    return arr; 
  }
}

module.exports = {SessionStore}; 