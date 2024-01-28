const express = require('express')
const router = express.Router(); 
const { 
    RetrieveChat, 
} = require("../controller/sessionController.js")


router.get("/retrieve-history/:roomKey", RetrieveChat);

module.exports = router; 