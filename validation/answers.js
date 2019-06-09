const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateAddAnswer = data => {
	let errors = {};
	data.question = !isEmpty(data.question) ? data.question : '';
	data.answer = !isEmpty(data.answer) ? data.answer : '';

	if (Validator.isEmpty(data.question)) {
		errors.question = 'Question field is required';
	} else if (data.question.length < 10) {
		errors.question = 'Question min length 10';
	}

	if (Validator.isEmpty(data.answer)) {
		errors.answer = 'Answer field is required';
	} else if (data.answer.length < 10) {
		errors.answer = 'Answer min length 10';
	}

	return { errors: { errors }, isValid: isEmpty(errors) };
};
