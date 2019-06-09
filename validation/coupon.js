const Validator = require('validator');
const isEmpty = require('./is-empty');
const CouponModel = require('../models/Coupon');

exports.validateCoupon = async data => {
	const regex = new RegExp(/^[a-zA-Z0-9]*$/);
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.type = !isEmpty(data.type) ? data.type : '';
	data.expiresIn = !isEmpty(data.expiresIn) ? data.expiresIn : '';
	data.value = !isEmpty(data.value) ? data.value : '';
	const findCoupon = await CouponModel.findOne({ name: data.name });

	if (!Validator.isLength(data.name, { min: 10, max: 10 })) {
		errors.name = 'Name must be 10 characters long';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	if (findCoupon) {
		errors.name = 'Name is already taken';
	}

	if (!regex.test(data.name)) {
		errors.name =
			'Name can contain only numbers and letters.No white space allowed!';
	}

	if (Validator.isEmpty(data.type)) {
		errors.type = 'Type field is required';
	}

	if (data.type !== 'value' && data.type !== 'percent') {
		errors.type = 'Invalid type';
	}

	if (Validator.isEmpty(data.expiresIn)) {
		errors.expiresIn = 'Exparation field is required';
	}

	if (!parseInt(data.expiresIn)) {
		errors.expiresIn = 'Exparation field must be integer';
	}

	if (Validator.isEmpty(data.value)) {
		errors.value = 'Value field is required';
	}

	if (data.type === 'value' && parseInt(data.value) < 1) {
		errors.value = 'Value for choosen type must be greather than 0';
	}

	if (
		data.type === 'percent' &&
		(parseInt(data.value) < 1 || parseInt(data.value) > 99)
	) {
		errors.value =
			'Value for choosen type must be greather than 0 and less than 100';
	}

	return { errors: { errors }, isValid: isEmpty(errors) };
};
