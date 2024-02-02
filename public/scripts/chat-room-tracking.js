/**
 * type chatRoom = {
 * //array of usernames 
 *  users: Array<string>
*   roomKey: string 
 * }
 * 
 */
//Tracks all the chatrooms the current user is a member of. 
class ChatRoomClass {
    constructor(){
        this.chatRooms = [];  
    }
    //{room_key:string, users: Array<string>} 
    addChatRoom(room_key, users){
        try{
            //first check if a chat room with the same roomKey already exists
            if(!this.chatRooms.find(val => val.room_key === room_key)){
                var room = {
                    room_key,
                    users, 
                }
                this.chatRooms.push(room)
                return true; 
            }
            return false;
        }catch(e){
            console.log("addChatRoom ", e)
            return false;
        }
    }   
    updateChatRoom(room_key,users){
        try{
            let found = false; 
            let userSet = new Set(users)
            let arr = this.chatRooms.map((item)=>{
                if(item.room_key === room_key){
                    found = true; 
                    item.users = Array.from(userSet)
                }
                return item; 
            }); 
            if(found){
                this.chatRooms = arr; 
            }
            else{
                throw new Error(`Room ${room_key} doesn't exist.`)
            }
        }catch(e){console.log("updateChatRoom : ", e)}       
    }
    addSingleUserToChatRoom(room_key, user){
         try{
            let found = false; 
            let arr = this.chatRooms.map((item)=>{
                if(item.room_key === room_key){
                    found = true; 
                    let tempArr = item.users;
                    tempArr.push(user);
                    let userSet = new Set(tempArr)
                    item.users = Array.from(userSet)
                }
                return item; 
            }); 
            if(found){      
                this.chatRooms = arr; 
            }
            else{
                throw new Error(`Room ${room_key} doesn't exist.`)
            }
        }catch(e){console.log("addUserToChatRoom: ", e)}              
    }
    removeSingleUserFromChatRoom(room_key, user){
         try{
            let found = false; 
            let arr = this.chatRooms.map((item)=>{
                if(item.room_key === room_key){
                    found = true; 
                    let tempArr = item.users.filter(item => item != user);
                    item.users = tempArr; 
                }
                return item 
            }); 
            if(found){
                this.chatRooms = arr; 
            }
            else{
                throw new Error(`Room ${room_key} doesn't exist.`)
            }
        }catch(e){console.log("removeSingleUserFromChatRoom: ", e)}              
    }
    getAllChatRooms(){
        return this.chatRooms; 
    }
}

const CurrentUserChatRooms = new ChatRoomClass(); 