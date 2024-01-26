const express = require("express");
const app = express();
const path = require("path");
const { 
  SessionMiddleware, 
 } = require("./middlewares/sessionMiddleware.js")
const { InitializeSocket } = require("./util/initiatlizeSocket.js"); 
const {v4: uuidv4} = require("uuid"); 
const http = require("http");
require('dotenv').config(); 

//Imports the built in Node JS http module

const server = http.createServer(app);
//creates HTTP server
//It takes a callback function app that will be invoked everytime an HTTP request is received
//App is expected to be a callback function

const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" 
  }
});

var indexRouter = require("./routes/index");
app.set("trust proxy", 1)

//allows server to parse any incoming json 
app.use(express.json)
app.use(SessionMiddleware)
app.use("/", indexRouter);
InitializeSocket(io);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

server.listen(3000, () => {
  console.log("Listening at 3000");
});
