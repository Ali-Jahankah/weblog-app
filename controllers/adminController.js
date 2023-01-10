const Post = require("../models/Post");
const multer = require("multer");
const sharp = require("sharp");
const shortId = require("shortid");
const { fileFilter } = require("../utils/multer");
const { get500 } = require("./errorsController");

exports.loadDashboard = async (req, res) => {
  try {
    if(req.query.page<1){
      req.query.page=1;
    }
    const page = +req.query.page || 1;
    const numberOfPosts = await Post.find({ user: req.user._id }).countDocuments();
    const pagination = {
      per_page: 2,
      current_page: page,
      next_page: page + 1,
      previous_page: page - 1,
      has_previous_page: page > 1,
      has_next_page:function(){return page * this.per_page < numberOfPosts},
      last_page: Math.ceil(numberOfPosts / this.per_page),
      x:()=>this.per_page
      } 

    const posts = await Post.find({ user: req.user._id }).skip(pagination.per_page*(page-1)).limit(pagination.per_page);

console.log(pagination.has_next_page())

    res.render("privet/blogs", {
      pageTitle: "Dashboard",
      path: "/dashboard",
      layout: "./layouts/dashTemp.ejs",
      fullname: req.user.fullname,
      posts,
      pagination,
      numberOfPosts,
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
exports.editPostForm = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    if (post && post.user.toString() == req.user._id) {
      return res.render("privet/editPostForm", {
        pageTitle: "Edit Post",
        path: "/dashboard/edit-post",
        layout: "./layouts/dashTemp.ejs",
        fullname: req.user.fullname,
        error: [],
        post,
      });
    }
    if (post.user.toString() != req.user._id) {
      return res.redirect("/dashboard");
    } else {
      return res.redirect("errors/404");
    }
  } catch (er) {
    return res.redirect("errors/404");
  }
};
exports.createPost = async (req, res) => {
  const errors = [];
  try {
    await Post.postValidation(req.body);
    const newPost = { ...req.body, user: req.user._id };
    await Post.create(newPost);
    return res.redirect("/dashboard");
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
exports.editPost = async (req, res) => {
  console.log(req.body);
  const errors = [];
  const post = await Post.findOne({
    _id: req.params.id,
  });
  try {
    await Post.postValidation(req.body);
    if (!post) {
      res.redirect("errors/404");
    }
    if (post.user.toString() != req.user._id) {
      res.redirect("/dashboard");
    }
    const { body, title, status } = req.body;
    post.body = body;
    post.status = status;
    post.title = title;
    await post.save();

    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("privet/editPostForm", {
      pageTitle: "Edit Post Form",
      path: "/dashboard/edit-post",
      layouts: "/layouts/deshTemp.ejs",
      fullname: req.user.fullname,
      error: errors,
      post,
    });
  }
};
exports.uploadImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    // dest: "/uploads",
    fileFilter: fileFilter,
    // storage: storage,
  }).single("image");
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (req.file && req.file.mimetype === "image/jpeg") {
        const fileName = `${shortId.generate()}_${req.file.originalname}`;
        await sharp(req.file.buffer)
          .jpeg({ quality: 60 })
          .toFile(`./public/uploads/${fileName}`);
        res.status(200).send(`http://localhost:3000/uploads/${fileName}`);
      } else {
        res.send("Please choose an image first!");
      }
    }
  });
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (req.user._id == post.user.toString() && post) {
      await Post.findByIdAndRemove(req.params.id);
      return res.redirect("/dashboard");
    } else {
      return res.redirect("/errors/500");
    }
  } catch (error) {
    console.log(error);

    res.redirect("errors/404");
  }
};
