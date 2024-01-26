const session = require("express-session")
const { v4:uuidv4 } = require("uuid")
require('dotenv').config(); 
const SessionMiddleware = session({
  genid: function(req){
    return uuidv4();
  },
  secret: process.env.EXPRESS_SESSION_SK, 
  resave: false, 
  saveUninitialized: true,
  cookie: {
    maxAge: 60000, 
    secure: process.env.ENVIRONMENT === "production" ? "true" : "auto", 
    httpOnly: true, 
    expires: 10000*60*60*24*7, 
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax", 
  }
})

//The wrap middlewarserves the purpose of making express-session work with socket.io 
const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next)

module.exports = { 
    SessionMiddleware, 
    wrap, 
}