const { Router } = require("express");
const router = new Router();
const Validate = require("fastest-validator");
const v = new Validate();
const schema = {
  fullname: {
    type: "string",
    trim: true,
    min: "4",
    max: "50",
    messages: {
      stringMin: "Full name shoud be more than 4 characters!",
    },
  },
  email: {
    type: "email",
    normalize: true,
    min: "10",
    messages: {
      stringMin: "Email shoud be more than 10 characters!",
    },
  },
  password: {
    type: "string",
    min: 6,
    max: 16,
    messages: {
      stringMin: "Password must be between 6 to 16 characters!",
    },
  },
  confirmPassword: {
    type: "string",
    min: 6,
    max: 16,
    messages: {
      stringMin: "Re-type Password must be between 6 to 16 characters!",
    },
  },
};
router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/register",
    error: "",
  });
});
router.post("/register", (req, res) => {
  const validate = v.validate(req.body, schema);
  const errArr = [];
  if (validate === true) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      errArr.push("Re-type Password is not same as password!");
      return res.render("register", {
        pageTitle: "Register Page",
        layout: "./layouts/mainTemp.ejs",
        path: "/register",
        error: errArr,
      });
    }
    res.redirect("/user/login");
  } else {
    console.log(validate);
    res.render("register", {
      pageTitle: "Register Page",
      layout: "./layouts/mainTemp.ejs",
      path: "/register",
      error: validate,
    });
  }
});
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
