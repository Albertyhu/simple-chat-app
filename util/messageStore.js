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
 * username: string, 
 * authorId: string, 
 * msg: string, 
 * time: Date, 
 * image: any, 
 * }
 */

const sample = {
    username: "Antsmasher",
    authorId: "3433dvsdsdf", 
    msg: "test",
    time: new Date(), 
}
/**
 * type MembersObj ={
 * username: string, 
 * in_chat_room: boolean, 
 * }
 * 
 */
function CreateMembersObj(id){
    return {
        id, 
        in_chat_room: false, 
    }
}

//uses roomKey as the key for the Map set
class MessageStorage { 
    constructor(){
        this.storage = new Map(); 
    }
    //creates a new storage value with given memebers and roomKey 
    createStorage(roomKey, members){
        var membersArr = members.map(id =>{
            return CreateMembersObj(id); 
        })
        const newStorage = {
            members: membersArr, 
            messages: [], 
        }
        this.storage.set(roomKey, newStorage)
    }

    saveMessages = (roomKey, username, authorId, msg, time) =>{ 
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
        messages.push({username, authorId, msg, time}); 
        const updatedStorage ={
            members,
            messages, 
        }
        this.storage.set(r_key, updatedStorage)
        // console.log("chat exist: ", this.storage.has(roomKey))
        // console.log("storage: ", this.storage)
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
    //returns array of members of a chat room
    getUserFromRoom(roomKey){
        try{
        var storage = this.storage.get(roomKey)
        return storage.members; 
        }catch(e){console.log(`getUserFromRoom error: ${e}`)}

    }
    updateUserStatus(roomKey, id, status){
         var updatedArr = this.storage.get(roomKey).members.map(user =>{
            if(id === user.id){
                user.in_chat_room = status
            }
            return user; 
         }); 
         this.storage.members = updatedArr; 
    }
}

module.exports = {MessageStorage}; 