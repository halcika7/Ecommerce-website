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
	data.featured = !isEmpty(data.featured) ? data.featured : '';
	data.dailyOffer = !isEmpty(data.dailyOffer) ? data.dailyOffer : '';
	data.weeklyOffer = !isEmpty(data.weeklyOffer) ? data.weeklyOffer : '';
	data.optionsDiscount = !isEmpty(data.optionsDiscount)
		? data.optionsDiscount
		: '';
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

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	if (findProduct) {
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
		(!Validator.toInt(data.year) >= 1000 ||
			!(Validator.toInt(data.year) <= new Date().getFullYear()))
	) {
		errors.year = 'Year must be between 1000 and current year';
	}

	if (
		Validator.isEmpty(data.published) ||
		!Validator.isBoolean(data.published)
	) {
		errors.published = 'Publish is required';
	}

	if (Validator.isEmpty(data.featured) || !Validator.isBoolean(data.featured)) {
		errors.featured = 'Featured is required';
	}

	if (
		Validator.isEmpty(data.dailyOffer) ||
		!Validator.isBoolean(data.dailyOffer)
	) {
		errors.dailyOffer = 'Daily offer is required';
	}

	if (
		Validator.isEmpty(data.weeklyOffer) ||
		!Validator.isBoolean(data.weeklyOffer)
	) {
		errors.weeklyOffer = 'Weekly offer is required';
	}

	if (
		(JSON.parse(data.weeklyOffer) === true ||
			JSON.parse(data.dailyOffer) === true) &&
		Validator.isEmpty(data.optionsDiscount)
	) {
		errors.optionsDiscount = 'Options Discount is required';
	} else if (
		(JSON.parse(data.weeklyOffer) === true ||
			JSON.parse(data.dailyOffer) === true) &&
		!Validator.isNumeric(data.optionsDiscount)
	) {
		errors.optionsDiscount = 'Options Discount needs to be a number';
	} else if (
		(JSON.parse(data.weeklyOffer) === true ||
			JSON.parse(data.dailyOffer) === true) &&
		(!Validator.isNumeric(data.optionsDiscount) ||
			JSON.parse(data.optionsDiscount) <= 0)
	) {
		errors.optionsDiscount = 'Options Discount needs to be greather than 0';
	} else if (
		(JSON.parse(data.weeklyOffer) === true ||
			JSON.parse(data.dailyOffer) === true) &&
		(!Validator.isNumeric(data.optionsDiscount) ||
			JSON.parse(data.optionsDiscount) > 95)
	) {
		errors.optionsDiscount = 'Options Discount needs to be less than 96';
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

	subcategories.length > 0 &&
		subcategories.forEach(subcategory => {
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

	subcategories.length === 0 &&
		errors.subcategories.push({
			subName: 'Subcategory name is required',
			sub: 'Minimum 1 subcategory is required'
		});

	if (errors.subcategories.length === 0) {
		delete errors.subcategories;
	}

	if (
		(!errors.subcategories && subcategories[0].subName === 'Headphones') ||
		subcategories[0].subName === 'Speakers'
	) {
		data.wifi = !isEmpty(data.wifi) ? data.wifi : '';
		data.bluetooth = !isEmpty(data.bluetooth) ? data.bluetooth : '';
		if (Validator.isEmpty(data.wifi)) {
			errors.wifi = 'Wifi is required';
		} else if (
			(JSON.parse(data.wifi) !== true && data.wifi !== true || (typeof data.wifi === 'string' && data.wifi !== 'true')) &&
			(JSON.parse(data.wifi) !== false && data.wifi !== false || (typeof data.wifi === 'string' && data.wifi !== 'false'))
		) {
			errors.wifi = 'Wifi has to be an Boolean';
		}
		if (Validator.isEmpty(data.bluetooth)) {
			errors.bluetooth = 'Bluetooth is required';
		} else if (
			(JSON.parse(data.bluetooth) !== true && data.bluetooth !== true || (typeof data.bluetooth === 'string' && data.bluetooth !== 'true') ) &&
			(JSON.parse(data.bluetooth) !== false && data.bluetooth !== false || (typeof data.bluetooth === 'string' && data.bluetooth !== 'false'))
			) {
				errors.bluetooth = 'Bluetooth has to be an Boolean';
		}
	}

	const promises = await options.map(async option => {
		const optionErr = {};
		if (
			!errors.subcategories &&
			subcategories[0].sub !== 'Projection Screens' &&
			subcategories[0].sub !== 'Games'
		) {
			if (Validator.isEmpty(option.color)) {
				optionErr.color = 'Color is required';
			}
		}
		if (
			!errors.subcategories &&
			subcategories[0].sub === 'Projection Screens'
		) {
			if (Validator.isEmpty(option.display)) {
				optionErr.display = 'Projection Screen Size is required';
			}
		}
		if (!errors.subcategories && subcategories[0].sub === 'Games') {
			if (Validator.isEmpty(option.console)) {
				optionErr.console = 'Console is required';
			}
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
			const promises = await option.options.map(async opt => {
					const optError = {};
					const findSKU = await ProductModel.find({ 'options.options.sku': opt.sku });
					if (Validator.isEmpty(opt.sku) || opt.sku.length < 10) {
						optError.sku =
							'Option sku is required and must be at least 10 characters long';
					}
					if(findSKU.length !==0) {
						optError.sku =
							'Option sku is already in use';
					}
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
					if (
						!Validator.isEmpty(data.category) &&
						data.category !== 'Electronics'
					) {
						if (isEmpty(opt.size)) {
							optError.size = 'Option size is required';
						}
					}
					if (
						!errors.subcategories &&
						(subcategories[0].sub === 'Desktop Computers' ||
							subcategories[0].sub === 'Laptops')
					) {
						if (isEmpty(opt.ram)) {
							optError.ram = 'Ram size is required';
						} else if (isNaN(opt.ram)) {
							optError.ram = 'Ram size has to be an Integer';
						}
						if (isEmpty(opt.graphics)) {
							optError.graphics = 'Graphics size is required';
						} else if (isNaN(opt.graphics)) {
							optError.graphics = 'Graphics size has to be an Integer';
						}
						if (isEmpty(opt.ssd)) {
							optError.ssd = 'SSD size is required';
						} else if (isNaN(opt.ssd)) {
							optError.ssd = 'SSD size has to be an Integer';
						}
						if (isEmpty(opt.hdd)) {
							optError.hdd = 'HDD size is required';
						} else if (isNaN(opt.hdd)) {
							optError.hdd = 'HDD size has to be an Integer';
						}
						if (subcategories[0].sub === 'Desktop Computers') {
							if (isEmpty(opt.withDisplay)) {
								optError.withDisplay = 'Display is required';
							} else if (
								(JSON.parse(opt.withDisplay) !== true || opt.withDisplay !== true) &&
								(JSON.parse(opt.withDisplay) !== false || opt.withDisplay !== false)
							) {
								optError.withDisplay = 'Display has to be an Boolean';
							}
							if (isEmpty(opt.withKeyboard)) {
								optError.withKeyboard = 'Keyboard is required';
							} else if (
								(JSON.parse(opt.withKeyboard) !== true || opt.withKeyboard !== true) &&
								(JSON.parse(opt.withKeyboard) !== false || opt.withKeyboard !== false)
							) {
								optError.withKeyboard = 'Keyboard has to be an Boolean';
							}
							if (isEmpty(opt.withMouse)) {
								optError.withMouse = 'Mouse is required';
							} else if (
								(JSON.parse(opt.withMouse) !== true || opt.withMouse !== true) &&
								(JSON.parse(opt.withMouse) !== false || opt.withMouse !== false)
							) {
								optError.withMouse = 'Mouse has to be an Boolean';
							}
						}
						if (subcategories[0].sub === 'Laptops') {
							if (isEmpty(opt.resolution)) {
								optError.resolution = 'Resolution is required';
							}
						}
					}
					if (
						!errors.subcategories &&
						(subcategories[0].sub === 'Tablets' ||
							subcategories[0].sub === 'Phones')
					) {
						if (isEmpty(opt.memory)) {
							optError.memory = 'Memory size is required';
						} else if (isNaN(opt.memory)) {
							optError.memory = 'Memory size has to be an Integer';
						}
					}
					if (
						!errors.subcategories &&
						(subcategories[0].sub === 'Monitors' ||
							subcategories[0].sub === 'Televisions')
					) {
						if (isEmpty(opt.display)) {
							optError.display = 'Display size is required';
						}
						if (isEmpty(opt.resolution)) {
							optError.resolution = 'Resolution is required';
						}
						if (isEmpty(opt.smart)) {
							optError.smart = 'Smart is required';
						} else if (
							(JSON.parse(opt.smart) !== true || opt.smart !== true) &&
								(JSON.parse(opt.smart) !== false || opt.smart !== false)
						) {
							optError.smart = 'Smart has to be an Boolean';
						}
						if (isEmpty(opt.threeD)) {
							optError.threeD = '3D is required';
						} else if (
							(JSON.parse(opt.threeD) !== true || opt.threeD !== true) &&
								(JSON.parse(opt.threeD) !== false || opt.threeD !== false)
						) {
							optError.threeD = '3D has to be an Boolean';
						}
					}
					return optError;
			});
			optionErr.options = await Promise.all(promises);
			const bool = optionErr.options.find(err => Object.keys(err).length !== 0);
			if (!bool) {
				delete optionErr.options;
			}
		}
		return optionErr;
	});

	errors.options = await Promise.all(promises);

	const findNotEmptyErrorOption = errors.options.find(
		err => Object.keys(err).length !== 0
	);

	!findNotEmptyErrorOption && delete errors.options;

	if (!isEmpty(errors)) {
		files.forEach(async file => {
			await fs.remove(file.path);
		});
	}

	return { errors: { errors }, isValid: isEmpty(errors) };
};
