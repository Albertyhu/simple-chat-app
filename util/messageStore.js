const { v4: uuidv4 } = require("uuid")
const { CompareArrays } = require("../hooks/array.js")
/**
 * type storage = {
 * messages: Array<MessageInstance>
 * members: Array<string>
 * }
 */

/**
 * type MessageInstance ={
 * author: string, 
 * authorId: string, 
 * msg: string, 
 * time: Date, 
 * image: any, 
 * }
 */

const sample = {
    author: "Antsmasher",
    authorId: "3433dvsdsdf", 
    msg: "test",
    time: new Date(), 
}

class MessageStorage { 
    constructor(){
        this.storage = new Map(); 
    }
    //creates a new storage value with given memebers and roomKey 
    createStorage(roomKey, members){
        const newStorage = {
            members, 
            messages: [], 
        }
        this.storage.set(roomKey, newStorage)
    }

    saveMessages = (roomKey, author, authorId, msg, time) =>{
        console.log("roomKey: ", roomKey)
        console.log("msg: ", msg)
        var messages = []; 
        var members = []; 
        var r_key = roomKey;
        if(this.storage.has(roomKey)){
            const storage = this.storage.get(roomKey);
            members =  storage.members; 
            messages = storage.messages; 
        }
        else{
            throw new Error(`Chat ${roomKey} doesn't exist.`)
        }
        messages.push({author, authorId, msg, time}); 
        const updatedStorage ={
            members,
            messages, 
        }
        this.storage.set(r_key, updatedStorage)
        console.log("chat exist: ", this.storage.has(roomKey))
        console.log("storage: ", this.storage)

    }
    getChatHistoryById = (roomKey) =>{
        if(this.storage.has(roomKey))
            return this.storage.get(roomKey).messages; 
        else
            return null;
    }
    getChatSizeById = (roomKey)=>{
        if(this.storage.has(roomKey)){
            return this.storage.get(roomKey).messages?.length; 
        }
        else{
            throw new Error("getChatSizeById Error: Invalid roomKey")
        }
    }
    getAllChatThreads = () =>{
        return this.storage; 
    }
    getMessagesByAuthorId = (authorId) =>{
        var messArr = []; 
        this.storage.forEach(store =>{
            var arrInstance = store.messages.filter(message => message.authorId === authorId)
            messArr = messArr.concat(arrInstance); 
        })
        return messArr; 
    }
    countAllThreads = () =>{
        return this.storage.size; 
    }
    clearAllThreads = () =>{
        this.storage.clear(); 
    }
    doesChatAlreadyExist(members){
        var foundKey = null; 
        this.storage.forEach((store, key) =>{
            if(CompareArrays(store.members, members))
                foundKey = key; 
        })
        return foundKey; 
    }

}

module.exports = {MessageStorage}; 