const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = addUserValidation = data => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) errors.name = 'Name must be between 2 and 30 characters';

    if(Validator.isEmpty(data.name)) errors.name = 'Name field is required';

    if(!Validator.isLength(data.username, { min: 3, max: 15 })) errors.username = 'Username must be between 3 and 15 characters';

    if(Validator.isEmpty(data.username)) errors.username = 'Username field is required';

    if(Validator.isEmpty(data.email)) errors.email = 'Email field is required';

    if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid';

    return { errors: { errors }, isValid: isEmpty(errors) }
}