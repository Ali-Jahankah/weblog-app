const Post = require("../models/Post");
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
  });
};
exports.createPost = async (req, res) => {
  try {
    const newPost = { ...req.body, user: req.user._id };
    await Post.create(newPost);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    get500(req, res);
  }
};
