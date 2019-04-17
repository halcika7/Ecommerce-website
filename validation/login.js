const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.usernameEmail = !isEmpty(data.usernameEmail) ? data.usernameEmail : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.usernameEmail)) {
    errors.usernameEmail = "Username or Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return { errors: { errors }, isValid: isEmpty(errors) };
};
