const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/register", userController.register);
router.post("/register", userController.createUser);
router.get("/login", userController.login);
router.post("/login", userController.handleLogin);

module.exports = router;
