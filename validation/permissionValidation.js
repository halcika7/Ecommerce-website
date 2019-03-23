const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =  validateLoginInput = (data) => {
    let failedMessage;
    data = !isEmpty(data) ? data : '';

    if(Validator.isEmpty(data)) {
        failedMessage = 'Permission Name is required !';
    }

    return { failedMessage: { failedMessage }, isValid: isEmpty(failedMessage) }
}