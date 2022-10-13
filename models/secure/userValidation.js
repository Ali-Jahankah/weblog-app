const Yup = require("yup");

exports.schema = Yup.object().shape({
  fullname: Yup.string().min(4).max(50).required("Fullname can not be empty!"),
  email: Yup.string()
    .required("Email can not be empty")
    .email("Please check your email!"),
  password: Yup.string().required("Password can not be empty!").min(8).max(16),
  confirmPassword: Yup.string()
    .required("Re-type password can not be empty!")
    .oneOf(
      [Yup.ref("password"), null],
      "Re-type password is not matching with password"
    ),
});
