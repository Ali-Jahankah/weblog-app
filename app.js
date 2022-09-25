const path = require("path");
const connectDB = require("./config/db");

const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");

const indexRoute = require("./routes/index");
const app = express();

// Load Config
dotEnv.config({ path: "./config/config.env" });
connectDB();
// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Set Statics
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, process.env.BOOTSTRAP)));
// app.use(express.static(path.join(__dirname, process.env.FONT_AWESOME)));
//Log with Morgan in Dev Mode
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
// Routes
app.use(indexRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT} in ${process.env.NODE_ENV} Mode.`);
});
