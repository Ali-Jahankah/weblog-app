const express = require("express");

const path = require("path");
const indexRoute = require("./routes/index");
const app = express();
const PORT = 5000;

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Set Statics
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(indexRoute);
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
