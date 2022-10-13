const mongoose = require("mongoose");
const { schema } = require("./secure/userValidation");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname!"],
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address!"],
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minLength: 8,
    maxLength: 40,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
