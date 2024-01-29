const express = require('express')
const router = express.Router(); 
const { 
    RetrieveChat, 
    AddUserInPrivateChat, 
} = require("../controller/sessionController.js")

router.post("/load-user/:roomKey", AddUserInPrivateChat)

router.get("/retrieve-history/:roomKey", RetrieveChat);


module.exports = router; 