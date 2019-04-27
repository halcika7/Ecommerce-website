const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId;
const ProductModel = require('../models/Product');

exports.validateName = async (req, res) => {
	try {
		const checkProductNameExistence = await ProductModel.findOne({
			name: req.body.name
		});
		if (checkProductNameExistence) {
			return res.json({ error: 'Product with that name already exists !' });
		}
		return res.json({ success: 'Name available' });
	} catch (err) {
		return res.json({ error: err.message });
	}
};

exports.addProduct = async (req, res) => {
	try {
		// console.log(req.body)
		console.log(req.files);
		// req.body.pictures.forEach(picture => console.log(picture));
	} catch (err) {
		console.log(err);
		return res.json({ failedMessage: err.message });
	}
};
