const { v4: uuidv4 } = require("uuid")
const { CompareArrays } = require("../hooks/array.js")
/**
 * MessageStorage is responsible for storing all instances of a chat thread.
 * Every room is considered a unique chat thread.
 * It records all the messages that were posted in a chat room. 
 */

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

/**
 * type MembersObj ={
 * id: string, 
 * in_chat_room: boolean, 
 * }
 * 
 */
function CreateMembersObj(id, status){
    return {
        id, 
        in_chat_room: status, 
    }
}

//uses roomKey as the key for the Map set
class MessageStorage { 
    constructor(){
        this.storage = new Map(); 
    }
    //creates a new storage value with given memebers and roomKey 
    createStorage(roomKey, members){
        let membersArr = members.map(id =>{
            return CreateMembersObj(id, false); 
        })
        const newStorage = {
            members: membersArr, 
            messages: [], 
        }
        this.storage.set(roomKey, newStorage)
    }

    saveMessages = (roomKey, username, authorId, msg, date) =>{ 
        let messages = []; 
        let members = []; 
        let r_key = roomKey;
        if(this.storage.has(roomKey)){
            const storage = this.storage.get(roomKey);
            members =  storage.members; 
            messages = storage.messages; 
        }
        else{
            throw new Error(`Chat ${roomKey} doesn't exist.`)
        }
        messages.push({username, authorId, msg, date}); 
        const updatedStorage ={
            members,
            messages, 
        }
        this.storage.set(r_key, updatedStorage)
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
        let messArr = []; 
        this.storage.forEach(store =>{
            let arrInstance = store.messages.filter(message => message.authorId === authorId)
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
        let foundKey = null; 
        this.storage.forEach((store, key) =>{
            if(CompareArrays(store.members, members))
                foundKey = key; 
        })
        return foundKey; 
    }
    //finds out if a user is a member of the room 
    isMember(userId, roomKey){
        let found = false; 
        try{
            let storage = this.storage.get(roomKey); 
            if(storage){
                found = storage.members.some(user => user.id === userId)
                return found
            }
            else{
                throw new Error("There is no room that has the roomKey: " + roomKey)
            }

        } catch(e){console.error(`isUserInRoom error: ${e}`)}
        return found
    }

    //returns array of members of a chat room
    getUserFromRoom(roomKey){
        try{
        let storage = this.storage.get(roomKey)
        return storage.members; 
        }catch(e){console.log(`getUserFromRoom error: ${e}`)}

    }
    addUserToRoom(roomKey, userId, status){
        //first check if the userId already exist
        try{
            if(this.isMember(userId, roomKey)){
                let storage = this.storage.get(roomKey)
                //add new member to array
                storage.members.push(CreateMembersObj(userId, status))
                //update info
                this.storage.set(roomKey, storage)
            }
        } catch(e){console.log(`addUserToRoom error: ${e}`)}

    }
    updateUserStatus(roomKey, id, status){
         let updatedArr = this.storage.get(roomKey).members.map(user =>{
            if(id === user.id){
                user.in_chat_room = status
            }
            return user; 
         }); 
         this.storage.members = updatedArr; 
    }
}

module.exports = {MessageStorage}; 