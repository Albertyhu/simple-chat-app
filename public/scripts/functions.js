const genKey = (size) => {
  var key = "";
  for (var i = 0; i < size; i++) {
    key += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return key;
};

//replaces whitespaces in a string with underscore character
function replaceWhiteSpaces(inputString) {
  return inputString.replace(/\s/g, "_");
}

const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};

//responsible for creating sessions for users 
//Need to work on emiting message to server that user is online so his username gets put under "online users" in the menu
const AuthenticateUsername = async (userN, AuthCallback) =>{
  await fetch("/auth/add-user", {
    method: "POST",
    body: JSON.stringify({
      username: userN, 
    }),
    headers: {
      "Content-Type": "application/json", 
    }
  })
  .then(async response => await response.json())
  .then(result =>{
    Session.saveSessionInfo(result.username, result.id)
    var chatItem = {
      username: "",
      msg: `${result.username} is connected`,
    };
    socket.emit("chat message", chatItem);
    if (!LoginForm.classList.contains("closeForm"))
      LoginForm.classList.add("closeForm");
    AddUserElem(result.username);
  })
  .catch(error => {console.log("error: ", error)})
}
