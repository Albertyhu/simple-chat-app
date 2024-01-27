class SessionClass {
    constructor(name = null, ID = null){
        this.username = name; 
        this.sessionId = ID; 
    }
    Username(){
        return this.username; 
    }
    Id(){
        return this.sessionId; 
    }
    saveUsername(name){
        this.username = name; 
    }
    saveSessionInfo(name, ID ){
        this.username = name;
        this.sessionId = ID; 
    }
}

const Session = new SessionClass(null, null); 