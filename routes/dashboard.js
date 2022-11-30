const { Router } = require("express");
const { auth } = require("../config/auth");
const adminController = require("../controllers/adminController");
const router = new Router();
// Dashboard Routes

router.get("/", auth, adminController.loadDashboard);
// new post form=================
router.get("/new-post", auth, adminController.newPostForm);
router.post("/create-post", auth, adminController.createPost);
// router.post("/upload-image",auth,adminController.)
module.exports = router;
