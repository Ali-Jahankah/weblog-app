const path = require("path");
const connectDB = require("./config/db");

const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

// Load Config
dotEnv.config({ path: "./config/config.env" });
connectDB();
// View Engine
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainTemp");
app.set("views", "views");

// Set Statics
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, process.env.BOOTSTRAP)));
// app.use(express.static(path.join(__dirname, process.env.FONT_AWESOME)));

//Log with Morgan in Dev Mode

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
// using layoutes
app.use(expressLayout);
// Body parser
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/", require("./routes/index"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", require("./routes/user"));
app.use(require("./routes/404"));
//ession and flash message
app.use(
  session({
    secret: "Secret",
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT} in ${process.env.NODE_ENV} Mode.`);
});
