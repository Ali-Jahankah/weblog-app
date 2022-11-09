exports.loadDashboard = async (req, res) => {
  res.render("privet/blogs", {
    pageTitle: "Dashboard",
    path: "/dashboard",
    layout: "./layouts/dashTemp.ejs",
    fullname: req.user.fullname,
  });
};
exports.newPostForm = (req, res) => {
  res.render("privet/newPostForm", {
    pageTitle: "New Post",
    path: "/dashboard/new-post",
    layout: "./layouts/dashTemp.ejs",
    fullname: req.user.fullname,
  });
};
