const { convertUserMapToArrays } = require("../hooks/array.js")

/**
 * SessionStore keeps track of all info about the current users of the chat app including whether or not they are online.
 */

//Note: it makes no sense to store socket id here because if the user is in multiple rooms at the same  time, he may have
//different socket id's.
//What complicates this even more is that sometimes the user has the same socket ids in two rooms. 
/**
 * type session ={
 *  id: string, 
 *  username: string, 
 *  connected: boolean, 
 * }
 * 
 */
 
//This.sessions uses the user's id as the key 
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

  //this function takes a Set of user id's and creates an array of user info corresponding to the id's 
  //setObj: Set
  convertIdSetToArrayOfUsers(setObj){
    try{
      var arr = []; 
      setObj.forEach(item =>{
        if(this.sessions.has(item)){
          arr.push(this.sessions.get(item))
        }
      })

      return arr; 
    } catch(e){console.log(`convertIdSetToArrayOfUsers error: ${e}`)}
  }

  FormatArrayOfUsers(OnlineUsers){
    try{
      var arr = []
      OnlineUsers.forEach(item =>{
          var user = this.sessions.get(item.id);
          if(item.in_chat_room){
            const onlineUser = {
                username: user.username, 
                id: user.id,
                socketId: user.socketId,  
              }
            arr.push(onlineUser)
          }
      })
      return arr; 
    } catch(e){console.log(`convertIdSetToArrayOfUsers error: ${e}`)}
  }
}

module.exports = {SessionStore}; 