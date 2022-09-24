const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");

const indexRoute = require("./routes/index");
const app = express();

// Load Config
dotEnv.config({ path: "./config/config.env" });

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Set Statics
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(indexRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT} in ${process.env.NODE_ENV} Mode.`);
});
