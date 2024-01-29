const express = require("express");
const {    
    AddUser, 
    LogSession,
  } = require("../controller/sessionController.js"); 

var router = express.Router();

router.post("/add-user", AddUser)

router.put("/log-activity/:id/:status", LogSession)

module.exports = router; 