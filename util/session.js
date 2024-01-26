/**
 * type session ={
 *  userID: string, 
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

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

module.exports = {SessionStore}; 