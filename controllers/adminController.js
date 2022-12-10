const Post = require("../models/Post");
const multer = require("multer");
const { storage, fileFilter } = require("../utils/multer");
const { get500 } = require("./errorsController");

exports.loadDashboard = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id });

    res.render("privet/blogs", {
      pageTitle: "Dashboard",
      path: "/dashboard",
      layout: "./layouts/dashTemp.ejs",
      fullname: req.user.fullname,
      posts,
    });
  } catch (error) {
    get500(req, res);
    console.log(error);
  }
};
exports.newPostForm = (req, res) => {
  res.render("privet/newPostForm", {
    pageTitle: "New Post",
    path: "/dashboard/new-post",
    layout: "./layouts/dashTemp.ejs",
    fullname: req.user.fullname,
    error: [],
  });
};
exports.createPost = async (req, res) => {
  const errors = [];
  try {
    await Post.postValidation(req.body);
    const newPost = { ...req.body, user: req.user._id };
    await Post.create(newPost);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("newPostForm", {
      pageTitle: "New Post Form",
      path: "/dashboard/new-post",
      layouts: "/layouts/deshTemp.ejs",
      fullname: req.user.fullname,
      error: errors,
    });
  }
};
exports.uploadImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    dest: "/uploads",
    fileFilter: fileFilter,
    storage: storage,
  }).single("image");
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file) {
        res.status(200).send("آپلود عکس موفقیت آمیز بود");
      } else {
        res.send("جهت آپلود باید عکسی انتخاب کنید");
      }
    }
  });
};
