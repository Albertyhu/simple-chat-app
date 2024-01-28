//This creates a new session if there is a username in localStorage
if (!localUsername) {
  const LoginForm = document.getElementById("login-form");
  LoginForm.classList.remove("closeForm");
  RemoveUserElem();
} else {
  AuthenticateUsername(localUsername)
}

if(Session.id){
  socket.auth = {sessionID: Session.id}
  socket.connect(); 
}