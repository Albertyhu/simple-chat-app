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

const SampleChats = [
  {
    users: ["Archie", "Edward", "Brenda","Archie", "Edward", "Brenda","Archie", "Edward", "Brenda","Archie", "Edward", "Brenda","Archie", "Edward", "Brenda",], 
    roomKey: "fwfsefsfasefsefsefsf"
  }, 
    {
    users: ["Archie", "Edward", "Brenda"], 
    roomKey: "fwfsefsfasefsefsefsf"
  }, 
    {
    users: ["Archie", "Edward", "Brenda"], 
    roomKey: "fwfsefsfasefsefsefsf"
  }, 
    {
    users: ["Archie", "Edward", "Brenda"], 
    roomKey: "fwfsefsfasefsefsefsf"
  }, 
    {
    users: ["Archie", "Edward", "Brenda"], 
    roomKey: "fwfsefsfasefsefsefsf"
  }, 
]

/**
 * type chatArray ={
 *  room_key: string, 
 *  users: Array<string>
 * }
 */

//Renders the UI elements for existing Chat rooms on the menu 
const RenderExistingChatList = (chatArray) =>{
  //reset the list wrapper on the menu
  ExistingChatListWrapper.innerHTML = '';
  //render the items  
  chatArray.forEach((item,index) => {
    RenderChatListItem(ExistingChatListWrapper, item, index, chatArray.length)
  })
}

 //Renders the UI elements for existing Chat rooms on the menu 
const RenderChatListItem = (parentDiv, chatItem, index, size) =>{
  const {
    users, 
    room_key,
  } = chatItem; 
  const list = document.createElement('div')
  list.style.padding = "5px 0px";
  list.style.width = "90%";
  list.style.margin = "5px auto";
  list.style.borderTop = "1px solid #ffffff";

  if(size - index == 1){ 
    list.style.borderBottom = "1px solid #ffffff";
  } 

  const label = document.createElement("label");  

  label.classList.add("existing-chat-label"); 
  label.innerHTML = room_key === "PUBLIC" ? "Main Chat" : `Room ${index}`; 
  label.style.textAlign = "left"; 
  list.appendChild(label); 

  const listItemsBlock = document.createElement("div")
  listItemsBlock.classList.add("existing-chat-list-items")
  listItemsBlock.classList.add("gradient-text")
  list.appendChild(listItemsBlock);
  //renders each users in the chat room 

  const MembersSpan = document.createElement("span");
  MembersSpan.innerText = "Members: "; 
  MembersSpan.style.fontWeight = "bold"; 
  listItemsBlock.appendChild(MembersSpan)

  users.forEach((userItem, userIndex) =>{RenderUserInChatRoom(listItemsBlock, userItem, userIndex, users.length)})

  parentDiv.appendChild(list); 

  //If the chat room is the main chat room and room_key directs to the main chat room, do not make "list" a link
  if(roomKey != room_key){
    list.style.cursor = "pointer";
    if(room_key === "PUBLIC"){
      list.addEventListener("click", ()=>{
        window.location.href = `/`; 
      })  
    }
    else(
      list.addEventListener("click", ()=>{
        window.location.href = `/private-chat/${room_key}`; 
      })     
    )
  }

} 

//Complements the function RenderChatListItem for rendering each member of a chat room 
const RenderUserInChatRoom = (parentDiv, user, index, size) => {
  const UserSpan = document.createElement("span"); 
  UserSpan.innerText= size - index > 1 ? `${user}, ` : size > 1 ? `and ${user}.` : `${user}.`
  parentDiv.appendChild(UserSpan) 

}
