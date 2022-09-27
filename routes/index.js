const { Router } = require("express");
const router = new Router();

// Index Route - test
router.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Weblog App | MVC/EJS",
    layout: "./layouts/loginTemp.ejs",
  });
});

module.exports = router;
