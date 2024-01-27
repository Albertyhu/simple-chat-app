const { v4: uuidv4 } = require("uuid")
/**
 * type message = {
 * roomKey: string,
 * author: string, 
 * authorId: string, 
 * msg: string, 
 * time: Date, 
 * }
 */

class MessageStorage { 
    constructor(){
        this.messages = new Map(); 
    }
    saveMessages = (roomKey, author, authorId, msg, time) =>{
        var newArr = []; 
        var r_key = roomKey 
        if(this.messages.has(roomKey)){
            newArr = this.messages.get(roomKey); 
        }
        else{
            //create new key if room doesn't exist 
            var r_key = uuidv4(); 
        }
        newArr.push({author, authorId, msg, time}); 
        this.messages.set(r_key, newArr)
    }
    getChatHistoryById = (roomKey) =>{
        return this.messages.get(roomKey)
    }
    getChatSizeById = (roomKey)=>{
        return this.messages.get(roomKey).length; 
    }
    getChatThreadByRoomKey = (roomKey) =>{
        return this.messages.get(roomKey); 
    }
    getAllChatThreads = () =>{
        return this.messages; 
    }
    getMessagesByAuthorId = (authorId) =>{
    var messArr = []; 
    this.messages.forEach(chat =>{
      var arrInstance = chat.filter(val => val.authorId === authorId); 
      messArr = messArr.concat(arrInstance); 
    })
    countAllThreads = () =>{
        return this.messages.size; 
    }
    clearAllThreads = () =>{
        this.messages.clear(); 
    }
    return messArr; 
  }
}

module.exports = {MessageStorage}; 