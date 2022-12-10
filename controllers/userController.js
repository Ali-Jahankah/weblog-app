// const bcrypt = require("bcryptjs");
const passport = require("passport");
const fetch = require("node-fetch");
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
    // const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password });
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
      message: req.flash("success_msg"),
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
exports.handleRememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.expire = null;
  }
  res.redirect("/dashboard");
};
exports.handleLogin = async (req, res, next) => {
  // if (!req.body["g-recaptcha-response"]) {
  //   req.flash("error", "Please do the Re-captcha first!");
  //   return res.redirect("/user/login");
  // }
  // const captcha_sec = process.env.CAPTCHA_SECRET;
  // const verify_url = `https://google.com/recaptcha/api/siteverify?secret=${captcha_sec}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;
  // const response = await fetch(verify_url, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  //   },
  // });
  // const data = await response.json();
  // if (data.success) {
  passport.authenticate("local", {
    // successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
  // }
};
exports.logout = (req, res, next) => {
  req.session = null;
  req.logout((err) => {
    if (err) next(err);
  });
  // req.flash("success_msg", "Loged out successfuly!");
  res.redirect("/");
};
