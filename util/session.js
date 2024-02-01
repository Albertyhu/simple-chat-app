const { 
  convertToUniqueArray,
  convertMapToArray, 
  } = require("../hooks/array.js")
const { v4:uuidv4 } = require("uuid"); 

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
 * //notificatin needs to be built
 *  InviteNotification: Map<NoteId, obj>
 * 
 * }
 * 
 */

/**
 * type InviteNotificationObj = {
 *  NoteId: string, 
 * 
 *  roomKey: string, , 
 *  time: Date,
*   inviter_name: string, 
    //socket.id of inviter
    inviter: string,
    //socket.id of invitee 
    seen: boolean, 
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
    return this.sessions.get(id).username
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
        InviteNotification: value.InviteNotification, 
      //  socketId: value.socketId, 
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
                InviteNotification: user.InviteNotification,   
              }
            arr.push(onlineUser)
          }
      })
      return arr; 
    } catch(e){console.log(`convertIdSetToArrayOfUsers ${e}`)}
  }
  AddInviteNotification({roomKey, time, inviter_name, inviter, invitee}){
    try{
      //get session of invitee
      let inviteeSession = this.sessions.get(invitee)
      let NoteId = uuidv4(); 
      inviteeSession.InviteNotification.add(NoteId, {
        roomKey,
        time,
        inviter_name, 
        inviter,
        seen: false, 
      })
      this.sessions.set(invitee, inviteeSession); 
    } catch(e){console.log(`AddInviteNotification ${e}`)}
  }
  updateNotificationView(userId, NoteId, status){
    try{
      let session = this.sessions.get(userId)
      let notification = session.InviteNotification.get(NoteId); 
      notification.seen = status; 
      session.InviteNotification.set(NoteId, notification); 
      this.sessions.set(userId, session)
    } catch(e){console.log(`updateNotificationView ${e}`)}
  } 
  //returns Invite Notifications as an array
  getNotificationsByUserId(userId){
    try{ 
      return convertMapToArray(this.sessions.get(userId).InviteNotification);
    } catch(e){console.log(`getAllNotifications ${e}`)}
  }
}

module.exports = {SessionStore}; 