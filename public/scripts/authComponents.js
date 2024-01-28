class SessionClass {
    constructor(name = null, ID = null, connected = null){
        this.username = name; 
        this.sessionId = ID; 
        this.connected = connected; 
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
}

const Session = new SessionClass(null, null, null, null); 