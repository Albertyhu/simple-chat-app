var socket = io();
var chatform = document.getElementById('chatform'); 
var username = localStorage.getItem("username")
var LoginFrom = document.getElementById("login-form")
var MobileMenu = document.getElementById("MobileMenu")
var LogoutLink = document.getElementById("logout-link")
var MenuHeader = document.getElementById('MenuHeader')
const UserList = document.getElementById("online-list"); 

const UserOnline = (userN) =>{
    MenuHeader.style.display="block"; 
    MenuHeader.innerHTML = `<p>You are logged in as</p><p><b>${userN}</b></p>`
    LogoutLink.style.display="block"; 
    chatform.style.display = "flex"; 
}

const UserOffline = () =>{
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

    UserOffline();
    const LoginForm = document.getElementById("login-form");
    LoginForm.classList.remove("closeForm")

    socket.emit("remove user", UsernameInput.value);
}

if(!username){
    const LoginForm = document.getElementById("login-form");
    LoginForm.classList.remove("closeForm")
    UserOffline(); 
}
else{
    var chatItem = {
        username: "", 
        msg: `${username} is connected`, 

    }
    socket.emit("chat message", chatItem)
    socket.emit("add to user map", username)
    UserOnline(username);
}

const AddUserToList = (userN, ID)=>{
    const userLi = document.createElement("li")
    userLi.classList.add("listItemStyle")
    userLi.setAttribute("id", `id-${ID}`)

    const RingContainer = document.createElement("div")
    RingContainer.classList.add("ring-container")

    const RingRing = document.createElement("div")
    RingRing.classList.add("ringring")
    const Circle = document.createElement("div")
    Circle.classList.add("circle")
    RingContainer.append(RingRing)
    RingContainer.append(Circle)
    userLi.append(RingContainer)

    const nameDiv = document.createElement("div")
    nameDiv.innerText = userN; 
    userLi.append(nameDiv)
    UserList.append(userLi)
}

const RemoveUserFromList = (ID) =>{
    const target = document.getElementById(`id-${ID}`)
    if(target)
        UserList.removeChild(target)
}

socket.on("update user list", userList =>{
    console.log("userlist: ", userList)
    userList.forEach(user =>{
        AddUserToList(user.username, user.id)
    })
})

socket.on("add to list", (userInfo) =>{
    AddUserToList(userInfo.username, userInfo.ID); 
})

socket.on("remove from list", (userId) =>{
    RemoveUserFromList(userId)
})