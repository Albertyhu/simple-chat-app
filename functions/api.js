const express = require("express");
const serverless = require("serverless-http"); 
const app = express();
const path = require("path");
const { 
  SessionMiddleware, 
 } = require("../middlewares/sessionMiddleware.js")
const { InitializeSocket } = require("../util/initiatlizeSocket.js"); 
const {v4: uuidv4} = require("uuid"); 
const http = require("http");

if(process.env.ENVIRONMENT != 'production') 
  require('dotenv').config(); 
 
//Imports the built in Node JS http module
 
const server = http.createServer(app);
//creates HTTP server
//It takes a callback function app that will be invoked everytime an HTTP request is received
//App is expected to be a callback function

const { Server } = require("socket.io") 
const io = new Server(server, {
  cors: {
    origin: process.env.ENVIRONMENT != 'production' ? "http://localhost:3000" : process.env.DOMAIN, 
  }
});

var indexRouter = require("../routes/index");
var authRouter = require("../routes/auth.js")
var privateChatRouter = require("../routes/private-chat-api.js")

app.set("trust proxy", 1) 

//allows server to parse any incoming json  
app.use(express.json()) 
app.use(SessionMiddleware)

app.use("/", indexRouter);
app.use("/auth", authRouter)
app.use("/private-chat", privateChatRouter)

// app.use("/.netlify/functions/api/", indexRouter); 
// app.use("/.netlify/functions/api/auth", authRouter)
// app.use("/.netlify/functions/api/private-chat", privateChatRouter)


InitializeSocket(io);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

server.listen(3000, () => {
  console.log("Listening at 3000"); 
});


module.exports.handler = serverless(app)