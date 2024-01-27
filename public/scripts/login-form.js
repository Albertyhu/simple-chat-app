const LoginForm = document.getElementById("login-form");
const UsernameInput = document.getElementById("username-input");
var MenuHeader = document.getElementById("MenuHeader");

UsernameInput.addEventListener("change", (e) => {
  if (!LoginErrorMessage.classList.contains("hideLoginError")) {
    LoginErrorMessage.classList.add("hideLoginError");
  }
});

LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Username = UsernameInput.value.trim();
  AuthenticateUsername(Username)
  localStorage.setItem("username", Username);
});


// LoginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const Username = UsernameInput.value.trim();
//   if (Username) {
//     username = Username;

//     var TempKey = genKey(20);
//     const checkUsername = {
//       username: Username,
//       TempKey,
//     };
//     socket.emit("new user", checkUsername);
//     socket.on(`checkusername-${TempKey}`, (result) => {
//       if (result.validity) {
//         localStorage.setItem("username", Username);
//         localStorage.setItem("sessionId", result.sessionId)
//         socket.auth = {sessionId: result.sessionId}
//         if (!LoginForm.classList.contains("closeForm"))
//           LoginForm.classList.add("closeForm");
//         var chatItem = {
//           username: "",
//           msg: `${Username} is now connected`,
//         };

//         socket.emit("chat message", chatItem);
//         AddUserElem(Username);
//       } else {
//         LoginErrorMessage.classList.remove("hideLoginError");
//       }
//     });
//   }
// });

