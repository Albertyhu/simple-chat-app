

const AddUserElem = (userN) =>{
    MenuHeader.style.display="block"; 
    MenuHeader.innerHTML = `<p>You are logged in as</p><p><b>${userN}</b></p>`
    LogoutLink.style.display="block"; 
    chatform.style.display = "flex"; 
}

const RemoveUserElem = () =>{
    LogoutLink.style.display="none"; 
    MenuHeader.innerHTML = ""; 
    MenuHeader.style.display = "none"
    chatform.style.display = "none"; 
}

const Logout = () =>{
    MobileMenu.classList.add('closed-menu');
    var userN = localStorage.getItem("username")
    var chatItem = {
        username: '',
        msg: `${userN} is now disconnected`
    }
    socket.emit("chat message", chatItem); 
    localStorage.removeItem("username");

    RemoveUserElem();
    const LoginForm = document.getElementById("login-form");
    LoginForm.classList.remove("closeForm")

    socket.emit("remove user", UsernameInput.value);
}

if(!localUsername){
    const LoginForm = document.getElementById("login-form");
    LoginForm.classList.remove("closeForm")
    RemoveUserElem(); 
}
else{
    var chatItem = {
        username: "", 
        msg: `${username} is connected`, 
    }
    socket.emit("chat message", chatItem)
    socket.emit("new user", username)
    AddUserElem(username);
}

const AddUserToList = (userN, ID)=>{
    const userLi = document.createElement("li"); 
    userLi.classList.add("listItemStyle"); 
    userLi.setAttribute("id", `id-${ID}`); 
    userLi.innerText = userN; 
    UserList.append(userLi); 
}

const RemoveUserFromList = (ID) =>{
    console.log("removing user: ", ID)
    const target = document.getElementById(`id-${ID}`)
    if(target)
        UserList.removeChild(target)
}

//Create elment for notifying user when a user is typing
const addUserTypingNote = (userN, ID) =>{
    var UserTypingNote=document.createElement("p"); 
    UserTypingNote.classList.add("hideServerMessage"); 
    UserTypingNote.innerText = `${userN} is typing...`; 
    UserTypingNote.setAttribute("id", `typing-${ID}`)
    serverMessage.appendChild(UserTypingNote); 
}

//Remove element that is responsible for notifying when the user is typing 
const removeUserTypingNote = (ID) =>{
    var removeNode = document.getElementById(`typing-${ID}`); 
    serverMessage.removeChild(removeNode); 
}

socket.on("update user list", userList =>{
    OnlineUsers = userList; 
    console.log("OnlineUsers: ", OnlineUsers)
    UserList.innerHTML = ""; 
    serverMessage.innerHTML = ""; 
    userList.forEach(user =>{
        AddUserToList(user.username, user.id); 
        addUserTypingNote(user.username, user.id); 
    })
})

socket.on("remove from list", (userId) =>{
    RemoveUserFromList(userId)
    removeUserTypingNote(userId) 
})