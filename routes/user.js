const { Router } = require("express");
const router = new Router();

router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/register",
  });
});
router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("req.body");
});
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
