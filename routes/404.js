const { Router } = require("express");
const router = new Router();
router.get("*", require("../controllers/errorsController").get404);

module.exports = router;
