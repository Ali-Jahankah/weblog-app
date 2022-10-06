const { Router } = require("express");
const router = new Router();
const Yup = require("yup");

router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/register",
    error: "",
  });
});
router.post("/register", async (req, res) => {
  const schema = Yup.object().shape({
    fullname: Yup.string().min(4).max(50).required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8).max(16),
    confirmPassword: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("password"), null],
        "Re-type password is not matching with password"
      ),
  });
  try {
    const validate = await schema.validate(req.body);
    if (!validate.errors) {
      res.render("register", {
        pageTitle: "Register Page",
        layout: "./layouts/mainTemp.ejs",
        path: "/register",
        error: ["Register Done"],
      });
    }
  } catch (error) {
    res.render("register", {
      pageTitle: "Register Page",
      layout: "./layouts/mainTemp.ejs",
      path: "/register",
      error: error.errors,
    });
  }
});
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login Page",
    layout: "./layouts/mainTemp.ejs",
    path: "/login",
  });
});

module.exports = router;
