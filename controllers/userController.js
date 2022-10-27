const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

exports.register = (req, res) => {
  res.render("register", {
    pageTitle: "Register Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/register",
    error: "",
  });
};
exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      errors.push({ message: "Email address is alredy registered!" });
      return res.render("register", {
        pageTitle: "Register Page",
        layout: "./layouts/mainTemp.ejs",
        path: "/register",
        error: errors,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hash });
    await newUser.save();
    req.flash("success_msg", "You registered successfuly!");
    res.redirect("/user/login");
  } catch (err) {
    console.log(err);

    err.inner.forEach((e) =>
      errors.push({
        name: e.path,
        message: e.message,
      })
    );
    return res.render("register", {
      pageTitle: "Register Page",
      layout: "./layouts/mainTemp.ejs",
      path: "/register",
      error: errors,
    });
  }
};
exports.login = (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};
exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
};
