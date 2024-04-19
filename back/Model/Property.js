const { request } = require("express");
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  property_diameter: {
    type: String,
    required: true,
  },
  property_img: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  agent_contact_number: {
    type: Number,
    required: true,
    minlength: [10, "agen contact number should have 10 numbers"],
  },
});

module.exports = mongoose.model("Property", propertySchema);
