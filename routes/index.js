const express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Chat application",
  });
});

router.get("/private-chat/:id", (req, res)=>{
  res.render("private-message", {
    title: 'Private messaging',
    roomKey: req.params.id, 
  })  
})

module.exports = router;
