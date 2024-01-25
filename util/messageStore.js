const { v4: uuidv4 } = require("uuid")

class MessageStorage {
    constructor(){
        this.messages = new Map(); 
    }
    //This may not be valid because roomKey is arbitrary 
    saveMessages = (roomKey, author, msg, time) =>{
        var newArr = []; 
        if(this.messages.has(roomKey)){
            newArr = this.messages.get(roomKey); 
            newArr.push({author, msg, time}); 
            this.messages.set(roomKey, newArr)
        }
        else{
            var newRoomKey = uuidv4(); 
            newArr.push({author, msg, time}); 
            this.messages.set(newRoomKey, newArr)
        }
    }
    getChatThreadByRoomKey = (roomKey) =>{
        return this.messages.get(roomKey); 
    }
    getAllChatThreads = () =>{
        return this.messages; 
    }
}

module.exports = MessageStorage; 