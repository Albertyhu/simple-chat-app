


const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};

//responsible for creating sessions for users 
//Need to work on emiting message to server that user is online so his username gets put under "online users" in the menu
const AuthenticateUsername = async (userN) =>{
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
    Session.saveSessionInfo(result.username, result.id, true)
    if (!LoginForm.classList.contains("closeForm"))
      LoginForm.classList.add("closeForm");
    AddUserElem(result.username);
    //save session info in client side 
    Session.saveSessionInfo(result.username, result.id, true)

    socket.emit("user info received", result)
  })
  .catch(error => {console.log("error: ", error)})
}
