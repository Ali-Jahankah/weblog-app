const mongoose = require("mongoose");

const { schema } = require("./secure/postValidation");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 40,
    trim: true,
  },
  body: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "privet"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
postSchema.statics.postValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
module.exports = mongoose.model("Post", postSchema);
