const LoginForm = document.getElementById("login-form");
const UsernameInput = document.getElementById("username-input"); 
var MenuHeader = document.getElementById('MenuHeader')

LoginForm.addEventListener("submit", e =>{
    e.preventDefault(); 
    if(UsernameInput.value){
        localStorage.setItem("username", UsernameInput.value)
        if(!LoginForm.classList.contains("closeForm"))
            LoginForm.classList.add("closeForm")
        var chatItem = {
            username: "", 
            msg: `${UsernameInput.value} is now connected`
        }
        socket.emit("chat message", chatItem)
        socket.emit("new user", UsernameInput.value);
        UserOnline(UsernameInput.value)
    }
})