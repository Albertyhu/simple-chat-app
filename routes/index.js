const express = require("express");
const {    
    AddUser, 
    LogSession 
  } = require("../controller/sessionController.js"); 
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Chat application",
    sessionID: req.session, 
  });
});

router.get("/private-chat/:id", (req, res)=>{

res.render("private-message", {
    title: 'Private messaging',
    roomKey: req.params.id, 
    sessionID: req.session, 
  })  
})


module.exports = router;
