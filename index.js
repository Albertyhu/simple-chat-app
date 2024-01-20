const express = require("express"); 
const app = express(); 
const path = require('path');
const {convertUserMapToArray} = require("./hooks/array.js")
const http = require("http");
//Imports the built in Node JS http module 

const server = http.createServer(app); 
//creates HTTP server
//It takes a callback function app that will be invoked everytime an HTTP request is received 
//App is expected to be a callback function 

const {Server} = require("socket.io"); 
const io = new Server(server)

var indexRouter = require("./routes/index"); 

app.use("/", indexRouter)

var onlineUsers = new Map(); 

io.on("connection", (socket) =>{
    var userMap = convertUserMapToArray(onlineUsers)
    socket.on("add to user map", newUser =>{
        onlineUsers.set(newUser, socket.id)
    })
    io.emit("update user list", userMap)
    socket.on("chat message", (message)=>{
        io.emit("chat message", message)
    })
    socket.on("new user", (newUser) =>{
        onlineUsers.set(newUser, socket.id)
        io.emit("add to list", {username: newUser, ID: onlineUsers.get(newUser) })
    })
    socket.on("remove user", (userRemoved) =>{
        var userID =  onlineUsers.get(userRemoved)
        onlineUsers.delete(userRemoved); 
        io.emit("remove from list", userID)
    })
    socket.on("disconnect", ()=>{
        console.log("User is disconnected.")
        io.emit("chat message", "User is disconnected")
    })
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "dist")));

server.listen(3000,()=>{
    console.log("Listening at 3000");    
})