const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/contactController");

router.post("/send_message", Controller.createContact);

module.exports = router;
