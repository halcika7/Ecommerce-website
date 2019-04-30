const Validator = require('validator');
const isEmpty = require('./is-empty');
const fs = require('fs-extra');
const ProductModel = require('../models/Product');

exports.addProductValidation = async (data, files) => {
	let subcategories = JSON.parse(data.subcategories);
	let options = JSON.parse(data.options);
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.price = !isEmpty(data.price) ? data.price : '';
	data.year = !isEmpty(data.year) ? data.year : '';
	data.published = !isEmpty(data.published) ? data.published : '';
	data.brand = !isEmpty(data.brand) ? data.brand : '';
	data.category = !isEmpty(data.category) ? data.category : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.smalldescription = !isEmpty(data.smalldescription)
		? data.smalldescription
		: '';
	subcategories = !isEmpty(subcategories) ? subcategories : '';
	options = !isEmpty(options) ? options : '';

	const findProduct = await ProductModel.findOne({ name: data.name });

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 and 30 characters';
	}

	if (Validator.isEmpty('')) {
		errors.name = 'Name field is required';
	}

	if(findProduct) {
		errors.name = 'Product name must be unique!';
	}

	if (
		!Validator.isInt(data.price) ||
		!Validator.toInt(data.price) ||
		!Validator.toInt(data.price) > 0
	) {
		errors.price = 'Price must be Integer and greather than 0';
	}

	if (
		!Validator.isInt(data.year) ||
		!Validator.toInt(data.year) ||
		(!Validator.toInt(data.year) >= 1000 || !(Validator.toInt(data.year) <= new Date().getFullYear()))
	) {
		errors.year = 'Year must be between 1000 and current year';
	}

	if (Validator.isEmpty(data.published)) {
		errors.published = 'Publish is required';
	}

	if (Validator.isEmpty(data.brand)) {
		errors.brand = 'Brand field is required';
	}

	if (Validator.isEmpty(data.category)) {
		errors.category = 'Category field is required';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required';
	}

	if (Validator.isEmpty(data.smalldescription)) {
		errors.smalldescription = 'Small Description field is required';
	}

	errors.subcategories = [];

	subcategories.length > 0 && subcategories.forEach(subcategory => {
		const errSub = {};
		if (Validator.isEmpty(subcategory.subName)) {
			errSub.subName = 'Subcategory name is required';
		}
		if (!subcategory.sub.length > 0) {
			errSub.sub = 'Minimum 1 subcategory is required';
		}

		if (Object.keys(errSub).length > 0) {
			errors.subcategories.push(errSub);
		}
	});

	subcategories.length === 0 && errors.subcategories.push({subName: 'Subcategory name is required', sub: 'Minimum 1 subcategory is required'});

	if (errors.subcategories.length === 0) {
		delete errors.subcategories;
	}

	errors.options = [];

	options.forEach(option => {
		const optionErr = {};
		if (Validator.isEmpty(option.color) ) {
			optionErr.color = 'Color is required';
		}
		if (Validator.isEmpty(option.featuredPicture)) {
			optionErr.featuredPicture = 'Featured Picture is required';
		}
		if (isEmpty(option.pictures)) {
			optionErr.pictures =
				'At least one picture required in multiple pictures upload';
		}
		if (isEmpty(option.options)) {
			optionErr.options = 'At least one option required!';
		}

		if (!isEmpty(option.options)) {
			optionErr.options = [];
			option.options.forEach(opt => {
				const optError = {};
				if (!parseInt(opt.quantity) > 0) {
					optError.quantity =
						'Option quantity must be integer and more than zero value..';
				}
				if (!(parseInt(opt.aditionalPrice) >= 0)) {
					optError.aditionalPrice =
						'Option aditional price must be integer and biger or equal to 0';
				}
				if (!(parseInt(opt.discount) >= 0 && parseInt(opt.discount) <= 99)) {
					optError.discount =
						'Option discount must be integer and biger or equal to 0';
				}
				if (isEmpty(opt.size)) {
					optError.size = 'Option size is required';
				}
				optionErr.options.push(optError);
			});
			const bool = optionErr.options.find(err => Object.keys(err).length !== 0);
			if (!bool) {
				delete optionErr.options;
			}
		}
		errors.options.push(optionErr);
	});

	const findNotEmptyErrorOption = errors.options.find(
		err => Object.keys(err).length !== 0
	);

	!findNotEmptyErrorOption && delete errors.options;

	if(!isEmpty(errors)) {
		files.forEach(async file => {
			await fs.remove(file.path);
		});
	}

	return { errors: { errors }, isValid: isEmpty(errors) };
};
