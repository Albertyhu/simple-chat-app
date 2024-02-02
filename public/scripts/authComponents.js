/**
 * type inviteNotification = {
 *  noteId: string, 
 *  inviter_name: string, 
 *  invitee: string,
 *  inviter: string, 
 *  time: Date, 
 *  roomKey: string, 
 * }
 */
class SessionClass {
    constructor(name = null, ID = null, connected = null){
        this.username = name; 
        this.sessionId = ID; 
        this.connected = connected; 
        this.inviteNotificationCount = 0; 
    }
    saveUsername(name){
        this.username = name; 
    }
    saveSessionInfo(name, ID, connected){
        this.username = name;
        this.sessionId = ID; 
        this.connected = connected; 
    }
    //connected: boolean 
    updateStatus(connected){
        this.connected = connected
    }
    incrementNotificationCount(){
        this.inviteNotificationCount++; 
    }
    decrementNotificationCount(){
        if (this.inviteNotificationCount > 0) {
            this.inviteNotificationCount--;
        }
    }
}

const Session = new SessionClass(null, null, null, null); 