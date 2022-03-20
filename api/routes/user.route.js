const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.get("/logout", userController.userLogout);

module.exports = router;
