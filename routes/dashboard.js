const { Router } = require("express");
const { auth } = require("../config/auth");
const adminController = require("../controllers/adminController");
const router = new Router();
// Dashboard Routes

router.get("/", auth, adminController.loadDashboard);
// new post form=================
router.get("/new-post", auth, adminController.newPostForm);
router.post("/create-post", auth, adminController.createPost);
router.post("/upload-image", auth, adminController.uploadImage);
// Edit post form=================
router.get("/edit-post/:id", auth, adminController.editPostForm);
router.post("/edit-post/:id", auth, adminController.editPost);
//Delete post
router.get("/delete-post/:id", auth, adminController.deletePost);

module.exports = router;
