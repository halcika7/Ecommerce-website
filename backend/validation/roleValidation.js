const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRole = data => {
	let failedMessage;
	data = !isEmpty(data) ? data : '';

	if (Validator.isEmpty(data)) {
		failedMessage = 'Role Name is required !';
	}

	return { failedMessage: { failedMessage }, isValid: isEmpty(failedMessage) };
};
