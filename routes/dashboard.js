const { Router } = require("express");
const { auth } = require("../config/auth");
const router = new Router();
// Dashboard Routes

router.get("/", auth, (req, res) => {
  res.render("dashboard", {
    pageTitle: "Dashboard",
    layout: "./layouts/dashTemp.ejs",
    path: "/dashboard",
  });
});

module.exports = router;
