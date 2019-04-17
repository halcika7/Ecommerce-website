const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewPassword(data) {
  let errors = {};

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,30})"
  );
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!strongRegex.test(data.password)) {
    errors.password =
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character($#%) and length must be between 6 and 30 characters";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return { errors: { errors }, isValid: isEmpty(errors) };
};
