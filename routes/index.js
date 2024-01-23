const express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Chat application",
  });
});

module.exports = router;
