const Validator = require('validator');
const isEmpty = require('./is-empty');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs-extra');
const StoreModel = require('../models/Stores');

exports.addStoreValidation = async (data, file, id = null) => {
	const { address, country, city, location, weekHours, satHours, email, phone, links } = JSON.parse(data.options);
    const File = file;
    
    let errors = {};

    if(!id) {
        const findStore = await StoreModel.findOne({ address });
        if (findStore) {
            errors.address = 'Store on provided address already exists';
        }
    }
    
    
	if (Validator.isEmpty(address)) {
        errors.address = 'Address field is required';
	}


    if(id !== null) {
        const findStore = await StoreModel.findOne({ _id: {$ne: new ObjectId(id)}, address });
        if(id && findStore) {
            errors.address = 'Store on provided address already existsssss';
        }
    }

    
    if (Validator.isEmpty(country)) {
        errors.country = 'Country field is required';
    }
    
    if (Validator.isEmpty(city)) {
        errors.city = 'City field is required';
    }
    
    if (isEmpty(location)) {
        errors.location = 'Lat and lng fields are required';
    }

    if (isEmpty(weekHours.from)) {
        errors.weekHoursFrom = 'Week working hours starting from is required';
    }

    if (isEmpty(weekHours.to)) {
        errors.weekHoursTo = 'Week working hours ending at is required';
    }

    if (isEmpty(satHours.from)) {
        errors.satHoursFrom = 'Saturday working hours starting from is required';
    }

    if (isEmpty(satHours.to)) {
        errors.satHoursTo = 'Saturday working hours ending at is required';
    }

    if (isEmpty(email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isEmail(email)) {
        errors.email = 'Invalid Email';
    }

    if (isEmpty(phone)) {
        errors.phone = 'Phone is required';
    }

    if (isEmpty(links)) {
        errors.links = 'Links are required';
    }

    if (isEmpty(links.facebook)) {
        errors.facebook = 'Facebook link is required';
    }

    if (isEmpty(links.instagram)) {
        errors.instagram = 'Instagram link is required';
    }

    if (isEmpty(links.twitter)) {
        errors.twitter = 'Twitter link is required';
    }

    if (isEmpty(File) && !id) {
        errors.picture = 'Picture is required';
    }
    
	if (!isEmpty(errors)) {
        if(File && File.path) {
            await fs.remove(File.path);
        }
    }
    
    if(isEmpty(errors) && (id !== null )&& File) {
        findStore = await StoreModel.findOne({ _id: new ObjectId(id) });
        await fs.remove(findStore.picture);
    }

	return { errors: { errors }, isValid: isEmpty(errors) };
};
