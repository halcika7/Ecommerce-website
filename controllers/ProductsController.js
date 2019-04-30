const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId;
const { addProductValidation } = require('../validation/productvalidation');
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
	const { errors, isValid } = await addProductValidation(req.body, req.files);
	if (!isValid) {
		return res.json(errors);
	}
	try {
		const name = req.body.name;
		const price = parseInt(req.body.price);
		const year = parseInt(req.body.year);
		const brand = req.body.brand;
		const category = req.body.category;
		const published = JSON.parse(req.body.published);
		const description = req.body.description;
		const smalldescription = req.body.smalldescription.replace(
			/<\/?[^>]+(>|$)/g,
			''
		);
		const subcategories = JSON.parse(req.body.subcategories);
		const rawOptions = JSON.parse(req.body.options);
		const files = req.files;

		files.forEach(async file => {
			await fs.move(
				file.path,
				`public/images/products/${req.body.name}/${file.filename}`
			);
		});
		
		const options = rawOptions.map(opt => {
			const newOpt = { ...opt, options: [...opt.options] };
			const findFeaturedPictureInFiles = files.find(
				file => file.originalname === opt.featuredPicture
			);
			if (findFeaturedPictureInFiles) {
				newOpt.featuredPicture = findFeaturedPictureInFiles.path;
			}
			newOpt.pictures = opt.pictures.map(picture => {
				const findPicture = files.find(file => file.originalname === picture);
				if (findPicture) {
					return findPicture.path;
				}
			});
			return newOpt;
		});

		const addProduct = new ProductModel({
			name,
			price,
			year,
			brand,
			category,
			published,
			description,
			smalldescription,
			subcategories,
			options
		});

		await addProduct.save();

		return res.json({ successMessage: 'New product successfully added!' });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getProducts = async (req, res) => {
	try {
		
		const products = await ProductModel.find({ published: true });

		return res.json({products});
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
