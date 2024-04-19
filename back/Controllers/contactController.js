const Contact = require("../Model/Contact");
const catchAsync = require("../Common/globalAsyncHandler");
const AppError = require("../Common/globalErrorHandler");
const User = require("../Model/User");

exports.createContact = catchAsync(async (req, res, next) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({
      status: "fail",
      message: "Email and message are required!",
    });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({
      status: "fail",
      message: "User not found with the provided email!",
    });
  }

  try {
    const data = await Contact.create({ email, message });
    res.status(201).json({
      status: "success",
      message: "Message Sent Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to send message",
      error: error.message,
    });
  }
});
