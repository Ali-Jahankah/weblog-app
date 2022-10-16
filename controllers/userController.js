const User = require("../models/User");
const bcrypt = require("bcryptjs");
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
    newUser
      .save()
      .then((u) => {
        console.log(u);
        res.redirect("/user/login");
      })
      .catch((errr) => {
        if (errr) {
          throw errr;
        }
      });
    req.flash("sccss_msg", "You registered successfuly!");
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
    message: req.flash("sccss_msg"),
  });
};
