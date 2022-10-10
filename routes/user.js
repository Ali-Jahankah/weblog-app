const { Router } = require("express");
const router = new Router();

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
