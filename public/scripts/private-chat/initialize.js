//The variable 'roomKey' will be passed from the server to the private-message.ejs file and can be used as a global variable
const Room = `room-${roomKey}`

//This creates a new session if there is a username in localStorage
if (!localUsername) {
  const LoginForm = document.getElementById("login-form");
  LoginForm.classList.remove("closeForm");
  RemoveUserElem();
} else {
  AuthenticateUsername(localUsername, roomKey)
}

if(Session.id){
  socket.auth = {sessionID: Session.id}
  socket.connect(); 
}