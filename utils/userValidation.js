const { userSchema } = require("../models/User");

const Yup = require("yup");

const userValidationSchema = Yup.object().shape({
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

userSchema.statics.userValidation = function (body) {
  return userValidationSchema.validate(body, { abortEarly: false });
};
