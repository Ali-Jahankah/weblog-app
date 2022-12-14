const path = require("path");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const winston = require("./config/winston");
const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const debug = require("debug")("weblog-debug");

const app = express();

// Load Config
dotEnv.config({ path: "./config/config.env" });
connectDB();
// Using debugger
debug("Database connected");
// Passport config
require("./config/passport");

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
  app.use(morgan("combined", { stream: winston.stream }));
}
// using layoutes
app.use(expressLayout);
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//ession and flash message
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Routes
app.use("/", require("./routes/index"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", require("./routes/user"));
app.use(require("./routes/404"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT} in ${process.env.NODE_ENV} Mode.`);
});
