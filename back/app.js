const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/userRoutes");
const propertyRouter = require("./Routes/propertyRoutes");
const savedPropertyRouter = require("./Routes/savedPropertyRoutes");
const contactRouter = require("./Routes/contactRoutes");
const AppError = require("./Common/globalErrorHandler");
const globalErrorHandler = require("./Controllers/errController");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

// Serve Products images folder
app.use("/property_images", express.static("property_images"));

app.use("/api/v1", userRouter);
app.use("/api/v1", propertyRouter);
app.use("/api/v1", savedPropertyRouter);
app.use("/api/v1", contactRouter);

// Route error handling middleware...
app.get("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

// Global error handling middleware...
app.use(globalErrorHandler);

module.exports = app;
