const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateTerm = (data) => {
  let errors = {};
  data.term = !isEmpty(data.term) ? data.term : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.term)) {
    errors.term = "Term field is required";
  }else if (data.term.length < 10) {
    errors.term = "Term min length 10";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }else if (data.text.length < 10) {
    errors.text = "Text min length 10";
  }

  return { errors: { errors }, isValid: isEmpty(errors) };
};
