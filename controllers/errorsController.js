exports.get404 = (req, res) => {
  res.render("errors/404", {
    pageTitle: "404 | Not Found",
    path: "/404",
  });
};
exports.get500 = (req, res) => {
  res.render("errors/500", {
    pageTitle: "500 | Not Found",
    path: "/404",
  });
};
