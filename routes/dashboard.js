const { Router } = require("express");
const router = new Router();
// Dashboard Routes

router.get("/", (req, res) => {
  res.render("dashboard", {
    pageTitle: "Dashboard",
    layout: "./layouts/dashTemp.ejs",
    path: "/dashboard",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/dashTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
