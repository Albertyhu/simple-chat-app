const express = require("express");
const app = express();
const path = require("path");
const {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  isUsernameUnique,
} = require("./hooks/array.js");    
const {
    genKey
} = require("./hooks/string.js") 
const http = require("http");
//Imports the built in Node JS http module

const server = http.createServer(app);
//creates HTTP server
//It takes a callback function app that will be invoked everytime an HTTP request is received
//App is expected to be a callback function

const { Server } = require("socket.io");
const io = new Server(server);

var indexRouter = require("./routes/index");

app.use("/", indexRouter);

var onlineUsers = new Map();

io.on("connection", (socket) => {
  var userMap = convertUserMapToArray(onlineUsers);
  io.emit("update user list", userMap);
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
  socket.on("new user", (newUser) => {
    const { username, TempKey } = newUser;
    let ValidName = false;
    if (isUsernameUnique(username, onlineUsers)) {
      var socketID = socket.id;
      onlineUsers.set(username, socketID);
      var newUserMap = convertUserMapToArray(onlineUsers);
      io.emit("update user list", newUserMap);
      ValidName = true;
    }
    const result = {
      validity: ValidName,
      userSocketId: socketID,
    };
    io.emit(`checkusername-${TempKey}`, result);
  });

  socket.on("remove user", (userRemoved) => {
    var userID = onlineUsers.get(userRemoved);
    onlineUsers.delete(userRemoved);
    io.emit("remove from list", userID);

  });

  socket.on("disconnect", () => {
    var userN = getNameById(socket.id, onlineUsers);
    onlineUsers = new Map(removeFromMap(socket.id, onlineUsers));
    console.log("updated list: ", onlineUsers);
    var chatItem = { username: "", msg: `${userN} is disconnected` };
    io.emit("chat message", chatItem);
    var newUserMap = convertUserMapToArray(onlineUsers);
    io.emit("update user list", newUserMap);
  });

  //when a user is typing
  socket.on("user is typing", (userN) => {
    io.emit("user is typing", onlineUsers.get(userN));
  });
  socket.on("no longer typing", (userN) => {
    io.emit("no longer typing", onlineUsers.get(userN));
  });
  
  //socket instence for when a someone once to send an invite 
  socket.on("chat-invite", (invite) => {
    const {
        inviter_name, 
        //socket.id of inviter
        inviter,
        //socket.id of invitee 
        invitee,
        roomKey, 
    } = invite; 
    //perhaps you need to check if invitee is still online
    //The variable 'invitee' is the socket id that is unique to the user.
    socket.to(invitee).emit(`invited-to-chat`, invite);
    socket.join(`room-${roomKey}`)
    //The following code can't be executed becuase the chat room might not be rendered yet. 
    // socket.to(`room-${roomKey}`).emit(`private-message`, {
    //   username: "", 
    //   msg: "You are now in a private chat room.", 
    //   roomKey, 
    // })
  });
  socket.on("accept-private-chat-invite", (room)=>{
    socket.join(room)
  })
  socket.on("private-message", (event)=>{
    const {
      username, 
      msg, 
      roomKey, 
    } = event;
    console.log("roomKey: ", roomKey)
    const room = `room-${roomKey}`
    io.to(room).emit("private-message", event)
  })
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

server.listen(3000, () => {
  console.log("Listening at 3000");
});
