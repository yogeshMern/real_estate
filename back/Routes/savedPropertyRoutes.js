const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/savedController");
const authenticate = require("../Common/authMiddlerware");

router.get("/get_all_saved_properties", Controller.getAllSavedProperties);
router.post("/save_property", authenticate, Controller.saveProperty);
router.delete("/remove_saved_property/:id", Controller.removeSavedProperties);

module.exports = router;
