const express = require("express");
const router = express.Router();

// Auth middleware
const { checkAuthorisation } = require("../middleware/authorisation");

const userController = require("../controllers/user.controller");

router.get("/", checkAuthorisation, userController.userData);

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.get("/logout", userController.userLogout);

// Password reset routes
router.post("/reset-password", userController.userResetPassword);
router.put("/update-password", userController.userUpdatePassword);

// File uploading dependency for '/upload-profile-image'
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload-profile-image",
  checkAuthorisation,
  upload.single("image"),
  userController.userUploadProfileImage
);

module.exports = router;
