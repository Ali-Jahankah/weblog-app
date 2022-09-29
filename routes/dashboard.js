const { Router } = require("express");
const router = new Router();
// Dashboard Routes
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
