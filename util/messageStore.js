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
 * members: Array<MembersObj>
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
 * socketIds: Set<string>, 
 * in_chat_room: boolean, 
 * }
 * 
 */
function CreateMembersObj(id, status){
    return {
        id, 
        socketIds: new Set(), 
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
            let storageInstance = this.storage.get(roomKey); 
            if(storage){
                found = storageInstance.members.some(user => user.id === userId)
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
        let storageInstance = this.storage.get(roomKey)
        return storageInstance.members; 
        }catch(e){console.log(`getUserFromRoom error: ${e}`)}
    }

    //Finds all online members in a room in an array. 
    getOnlineUserFromRoom(roomKey){
        try{
            let storageInstance = this.storage.get(roomKey); 
            return storageInstance.members.filter(member=>member.socketIds.size > 0)
        } catch(e){
            console.log(`getOnlineUserFromRoom error: ${e}`)
            return []; 
        }
    }

    addUserToRoom(roomKey, userId, status){
        //first check if the userId already exist
        try{
            if(this.isMember(userId, roomKey)){
                let storageInstance = this.storage.get(roomKey)
                //add new member to array
                storageInstance.members.push(CreateMembersObj(userId, status))
                //update info
                this.storage.set(roomKey, storageInstance)
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
    saveUserSocket(roomKey, userId, socketId){
        try {
            let storageInstance = this.storage.get(roomKey)
            if(storageInstance){
                let updatedMembers = storageInstance.members.map(user =>{
                    if(user.id === userId){
                        if(!user.socketIds){
                            user.socketIds = new Set(); 
                        }
                        user.socketIds.add(socketId)
                    }
                    return user; 
                })
                this.storage.set(roomKey, {...storageInstance, members: updatedMembers })
            }
        } catch(e){
            console.log(`saveUserSocketerror: ${e}`)
        }
    }
    removeUserSocket(roomKey, userId, socketId){
        try {
            let storageInstance = this.storage.get(roomKey)
            if(storageInstance){
                let updatedMembers = storageInstance.members.map(user =>{
                    if(user.id === userId && user.socketIds){
                        user.socketIds.delete(socketId)
                    }
                    return user; 
                })
                this.storage.set(roomKey, {...storageInstance, members: updatedMembers })
            }
        } catch(e){
            console.log(`removeUserSocket: ${e}`)
        }
    }

    //Finds the store instance with socket id 
    //returns the key
    //what it should return member's username and id
    findStoreInstanceBySocket(socketId){
        try{
            let foundKey = null; 
            this.storage.forEach((item,key)=>{
                item.members.forEach((member)=>{
                    if(member.socketIds && member.socketIds.has(socketId)){
                        foundKey=key; 
                    }
                })
            })
            return foundKey;
        }catch(e){
            console.log(`findStoreInstanceBySocket error: ${e}`)
        }
    }
    getKeyAndMemberInstanceBySocket(socketId){
        try{

            let foundKey = null; 
            let foundMemberKey = null; 
            this.storage.forEach((item,key)=>{
                item.members.forEach((member, memberKey)=>{
                    if(member.socketIds && member.socketIds.has(socketId)){
                        foundKey=key; 
                        foundMemberKey = memberKey; 
                    }
                })
            })
            return {
                foundKey,
                foundMemberKey, 
            };
        }catch(e){
            console.log(`findStoreInstanceBySocket error: ${e}`)
        }
    }
    disconnectMessage(io, socket, ExistingSession){
        try{
            let socketId = socket.id; 
            const {foundKey, foundMemberKey} = this.getKeyAndMemberInstanceBySocket(socketId)
            if(foundKey){
                let storageInstance = this.storage.get(foundKey); 
                let updatedMembers = storageInstance.members;
                //get user id 
                const userId= updatedMembers[foundMemberKey].id
                //remove socket id from Set
                updatedMembers[foundMemberKey].socketIds.delete(socketId); 
                //update Storage Map
                this.storage.set(foundKey, {messages: storageInstance.messages, members: updatedMembers})
                //broadcast message if the user no longer has socket id's in the room 
                if(updatedMembers[foundMemberKey].socketIds.size <= 0){
                    //update user's online status in chat room 
                    io.to(`room-${foundKey}`).emit("disconnected", `${ExistingSession.getName(userId)} left chat`)

                    //update list of online uers's in chat room 
                    var UsersInChat = this.getOnlineUserFromRoom(foundKey) || []; 
                    io.emit(`update-list-in-room-${foundKey}`, UsersInChat); 

                    //update user's status depending on whether or not he's in any chat room. 
                    if(!this.isUserOnline(userId)){
                        ExistingSession.updateOnlineStatus(userId, false)
                    }
                }
            }
            else{
                throw new Error(`socket.id ${socket.id} doesn't exist.`)
            }
        } catch(e){console.log(`disconnectMessage error: ${e}`)}
    }

    //returns Set of all keys of rooms that the user recorded to be in
    getAllRoomsUserIsIn(userId){
        let keySet = new Set(); 
        try{
            this.sessions.forEach((value,key)=>{
                value.members.forEach(member =>{
                    if(member.id === userId){
                        keySet.add(key)
                    }
                })
            })
        }catch(e){console.log(`getAllRoomsUserIsIn error: ${e}`)}
        return keySet; 
    }

    //checks to see if user is online by seeing if he has any socket.id's left 
    isUserOnline(userId) {
        try {
            let keySet = this.getAllRoomsUserIsIn(userId);

            for (let keyValue of keySet) {
                let members = this.sessions.get(keyValue).members;

                for (let member of members) {
                    if (member.id === userId && member.socketIds.size > 0) {
                        return true;
                    }
                }
            }
        } catch (e) {
            console.log(`isUserOnline error: ${e}`);
            return false; // Handle the error and consider the user offline
        }
        return false; // User not found in any session or has no socketIds
    }

    //finds out if user is in particular room by seeing if he has any socket.id's belonging to that room
    //not used
    isUserInRoom(roomKey, userId){
        return this.storage.get(roomKey).members.some(member=>{
            if(member.id === userId){
                return member.socketIds.size > 0; 
            }
            return false; 
        })
    }
}

module.exports = {MessageStorage}; 