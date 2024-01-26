const express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("req.session: ", req.session)
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
