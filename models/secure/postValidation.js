const Yup = require("yup");

exports.schema = Yup.object().shape({
  title: Yup.string()
    .required("Title should not be empty")
    .min(5, "Title should not be less than 5 characters!")
    .max(40, "Tile should not be more than 40 Characters!"),
  body: Yup.string()
    .required("Body must not be empty")
    .max(255, "Body should be less than 255 characters!"),
  status: Yup.mixed().oneOf(
    ["public", "privet"],
    "please choose one of the status"
  ),
});
