const { convertUserMapToArrays } = require("../hooks/array.js")

/**
 * type session ={
 *  id: string, 
 *  username: string, 
 *  connected: boolean, 
 * }
 * 
 */
 
class SessionStore {
  constructor(){
    this.sessions = new Map(); 
  }
  findSession(id) {
    return this.sessions.get(id);
  }
  findSessionByName(username){
    let user = null; 
    this.sessions.forEach(session =>{
        if(session?.username === username.trim()){
            user = this.findSession(session.id)
        }
    })
    return user; 
  }
  changeName(id, newName){
    let updateSession = this.session.get(id)
    updateSession.username = newName;
    this.session.set(id, updateSession); 
  }
  removeUser(id){
    this.session.delete(id); 
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
    return convertUserMapToArrays(this.sessions); 
  }
}

module.exports = {SessionStore}; 