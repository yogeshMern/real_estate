const User = require("../Model/User");
const catchAsync = require("../Common/globalAsyncHandler");
const AppError = require("../Common/globalErrorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All fields are required!"), 400);
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    // return next(new AppError("User with this email already exists!"), 400);
    return res.status(200).json({
      status: "fail",
      message: "User with this email already exists!",
    });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  if (!hashedPass) {
    return next(new AppError("Password is not crypted!"), 400);
  }

  const newUser = await User.create({ email, password: hashedPass });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });

  res.status(201).json({
    success: true,
    message: "Registration Successfully!",
    newUser,
    token,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("All fields are required!"), 400);
  }

  const existUser = await User.findOne({ email }).select("+password").lean();
  if (!existUser) {
    next(new AppError("User is'nt Registered with this email!"));
  }

  const isVaidPAssword = await bcrypt.compare(password, existUser.password);
  if (!isVaidPAssword) {
    // return next(new AppError("Invalid email or password!"), 200);
    return res.status(200).json({
      status: "fail",
      message: "Invalid email or password!",
    });
  }

  const token = jwt.sign({ _id: existUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });

  delete existUser.password;

  res.cookie("authToken", token, {
    expires: new Date(Date.now() + 30 * 24 * 3600000),
    path: "/",
    secure: false,
    signed: true,
  });

  res.status(200).json({
    succes: true,
    message: "Login successfuly!",
    existUser,
    token,
  });
});

exports.logoutUser = catchAsync(async (req, res, next) => {
  res.clearCookie("authToken");

  res.status(200).json({
    success: true,
    message: "User Logged out successfully",
  });
});
