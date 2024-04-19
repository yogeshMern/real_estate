const databaseConnection = require("./Database/database");
require("dotenv").config({ path: "./Config/config.env" });
const app = require("./app");

const PORT = process.env.PORT || 3000;

// console.clear();
databaseConnection();
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
