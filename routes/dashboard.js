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

module.exports = router;
