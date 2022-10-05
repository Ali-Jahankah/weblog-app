const { Router } = require("express");
const router = new Router();
const Yup = require("yup");

router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/register",
  });
});
router.post("/register", async (req, res) => {
  const schema = Yup.object().shape({
    fullname: Yup.string().min(4).max(50).required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8).max(16),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null]),
  });
  const validete = await schema.validate(req.body);

  console.log(validete);
  res.send("req.body");
});
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
