//This creates a new session if there is a username in localStorage
if (!localUsername) {
  const LoginForm = document.getElementById("login-form");
  LoginForm.classList.remove("closeForm");
  RemoveUserElem();
} else {
  AuthenticateUsername(localUsername)
  //socket.emit("new user", checkUsername);
  // socket.on(`checkusername-${TempKey}`, (result) => {
  //   if (result.validity) {
  //     var chatItem = {
  //       username: "",
  //       msg: `${username} is connected`,
  //     };
  //     username = localUsername;
  //     userSocketId = result.userSocketId;
  //     localStorage.setItem("sessionId", result.sessionId); 
  //     socket.auth = {sessionId: result.sessionId}; 
  //     socket.emit("chat message", chatItem);
  //     AddUserElem(username);
  //   } else {
  //     const LoginForm = document.getElementById("login-form");
  //     LoginForm.classList.remove("closeForm");
  //     RemoveUserElem();
  //   }
  // });
}

if(Session.Id()){
  socket.auth = {sessionID: Session.Id()}
  socket.connect(); 
}