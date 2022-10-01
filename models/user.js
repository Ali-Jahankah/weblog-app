const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 40,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = User;
