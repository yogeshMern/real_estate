const mongoose = require("mongoose");

const databaseConnection = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then((res) => console.log("Database Connected🟢"))
        .catch((err) => console.log("Database Connection Error🔴", err.message));
};

module.exports = databaseConnection