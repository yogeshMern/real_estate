const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/propertyController");
const upload = require("../Utils/multer");

router.get("/property_list", Controller.getAllProperty);
router.post(
  "/create_property",
  upload.single("property_img"),
  Controller.createProperty
);
router.patch("/update_property_details/:id", Controller.updatePropertyDetails);
router.delete("/remove_property/:id", Controller.removeProperty);

module.exports = router;
