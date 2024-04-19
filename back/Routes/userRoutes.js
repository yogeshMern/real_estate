const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/userController");

router.post("/register_user", Controller.createUser);
router.post("/login_user", Controller.loginUser);
router.post("/logout_user", Controller.logoutUser);

module.exports = router;
