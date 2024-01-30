var genKey = (size) => {
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

const RenderChatMessage = (chatItem) =>{
  var item = document.createElement("li");
  if (chatItem.username) {
    var divElement = document.createElement("div");
    divElement.classList.add("usernameDiv");
    var user_name = document.createElement("p");
    user_name.innerText = chatItem.username;
    user_name.classList.add("usernameStyle");
    divElement.append(user_name);
    if(chatItem.timeSubmitted){
      var dateObj = new Date(chatItem.timeSubmitted);
      var time = document.createElement("p");
      time.innerText = dateObj;
      time.style.fontStyle = "italic"; 
      divElement.append(time);
      item.append(divElement);
    }
  }
  var message = document.createElement("p");
  message.innerText = chatItem.msg;

  item.append(message);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
