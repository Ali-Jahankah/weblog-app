const { Router } = require("express");
const router = new Router();
router.get("*", (req, res) => {
  res.render("404", { pageTitle: "Not Found", path: "/404" });
});

module.exports = router;
