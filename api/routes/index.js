const express = require("express");
const router = express.Router();

// Middleware
const { checkAuthorisation } = require("../middleware/authorisation");

router.get("/", checkAuthorisation, (req, res) => {
  res.send("You are authorized!");
});

module.exports = router;
