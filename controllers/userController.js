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
  try {
    await User.userValidation(req.body);
    res.redirect("/user/login");
  } catch (err) {
    console.log(err);
    const errors = [];
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
  });
};
