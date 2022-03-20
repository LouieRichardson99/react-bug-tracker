const express = require("express");
const router = express.Router();

// Middleware
const { checkAuthorisation } = require("../middleware/authorisation");

router.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = router;
