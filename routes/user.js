const { Router } = require("express");
const router = new Router();
const { auth } = require("../config/auth");
const userController = require("../controllers/userController");

router.get("/register", userController.register);
router.post("/register", userController.createUser);
router.get("/login", userController.login);
router.post("/login", userController.handleLogin);
router.get("/logout", auth, userController.logout);
module.exports = router;
