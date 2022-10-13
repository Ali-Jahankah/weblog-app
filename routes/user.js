const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/register", userController.register);
router.post("/register", userController.createUser);
router.get("/login", userController.login);

module.exports = router;
