const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId;
const { addProductValidation } = require('../validation/productvalidation');
const ProductModel = require('../models/Product');

exports.addProduct = async (req, res) => {
	const { errors, isValid } = await addProductValidation(req.body, req.files);
	if (!isValid) {
		return res.json(errors);
	}
	try {
		const name = req.body.name,
			price = parseInt(req.body.price),
			year = parseInt(req.body.year),
			brand = req.body.brand,
			category = req.body.category,
			optionsDiscount = parseInt(req.body.optionsDiscount),
			published = JSON.parse(req.body.published),
			featured = JSON.parse(req.body.featured),
			dailyOffer = JSON.parse(req.body.dailyOffer),
			weeklyOffer = JSON.parse(req.body.weeklyOffer),
			description = req.body.description,
			smalldescription = req.body.smalldescription.replace(
				/<\/?[^>]+(>|$)/g,
				''
			),
			bluetooth = req.body.bluetooth,
			wifi = req.body.wifi,
			subcategories = JSON.parse(req.body.subcategories),
			rawOptions = JSON.parse(req.body.options),
			files = req.files.map(file => ({
				...file,
				destination: `public/images/products/${req.body.name}`,
				path: `public/images/products/${req.body.name}/${file.filename}`
			})),
			offer = {},
			date = new Date();

		if (dailyOffer) {
			offer.active = true;
			date.setDate(date.getDate() + 1);
			date.setHours(0, 0, 0, 0);
			offer.expires = date;
			offer.discount = optionsDiscount;
		}

		if (weeklyOffer) {
			offer.active = true;
			date.setDate(date.getDate() + 7);
			date.setHours(0, 0, 0, 0);
			offer.expires = date;
			offer.discount = optionsDiscount;
		}

		await req.files.forEach(
			async file =>
				await fs.move(
					file.path,
					`public/images/products/${req.body.name}/${file.filename}`
				)
		);

		const options = rawOptions.map(opt => {
			const newOpt = { ...opt };
			if (dailyOffer || weeklyOffer) {
				newOpt.options = newOpt.options.map(opt => ({
					...opt,
					discount: optionsDiscount
				}));
			}
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
			featured,
			description,
			smalldescription,
			wifi,
			bluetooth,
			subcategories,
			options,
			weeklyOffer: weeklyOffer ? offer : null,
			dailyOffer: dailyOffer ? offer : null
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
		// const products = await ProductModel.aggregate([
		// 	{$match: {'subcategories.subName': "Man's Clothing"}},
		// 	{$project: {
		// 		'options': {$filter: {
		// 			input: '$options',
		// 			as: 'option',
		// 			cond: {$eq: ['$$option.color', 'Aquamarine']}
		// 		}},
		// 	}}
		// ]);

		// const products = await ProductModel.find(
		// 	{
		// 		options: { $elemMatch: { 'options.discount': 20 } }
		// 	},
		// 	{
		// 		options: { $elemMatch: { 'options.discount': 20 } }
		// 	}
		// )
		// 	.sort('createdAt', -1)
		// 	.select('name price year brand category smalldescription timestamps');

		const products = await ProductModel.aggregate([
			{ $sample: { size: 4 } },
			{ $sort: { createdAt: -1 } },
			{ $match: { published: true } }
		]);
		// .sort({createdAt: 'desc'})
		// .select(
		// 	'name price year brand category smalldescription timestamps createdAt updatedAt'
		// ).limit(2);

		// const spliceEmptyOptions = products.map(product => product.options.length !== 0 ? product : null);

		return res.json({ products });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.homePage = async (req, res) => {
	try {
		const bannerProducts = await ProductModel.aggregate([
			{
				$match: {
					published: true,
					featured: true,
					dailyOffer: null,
					weeklyOffer: null
				}
			},
			{ $sort: { createdAt: -1 } },
			{ $sample: { size: 4 } }
		]);
		const newProducts = await ProductModel.aggregate([
			{ $match: { published: true, dailyOffer: null, weeklyOffer: null } },
			{ $sort: { createdAt: -1 } },
			{ $sample: { size: 8 } }
		]);
		const featuredProducts = await ProductModel.aggregate([
			{
				$match: {
					published: true,
					featured: true,
					dailyOffer: null,
					weeklyOffer: null
				}
			},
			{ $sample: { size: 8 } }
		]);
		const topSellingProducts = await ProductModel.aggregate([
			{ $match: { published: true, dailyOffer: null, weeklyOffer: null } },
			{ $sample: { size: 8 } },
			{ $sort: { numberOfsales: -1 } }
		]);
		const ourProducts = await ProductModel.aggregate([
			{ $match: { published: true, dailyOffer: null, weeklyOffer: null } },
			{ $sample: { size: 36 } }
		]);
		const dailyOffer = await ProductModel.aggregate([
			{ $match: { published: true, 'dailyOffer.active': true } },
			{ $sample: { size: 10 } }
		]);
		const weeklyOffer = await ProductModel.aggregate([
			{ $match: { published: true, 'weeklyOffer.active': true } },
			{ $sample: { size: 10 } }
		]);

		return res.json({
			newProducts,
			featuredProducts,
			topSellingProducts,
			bannerProducts,
			ourProducts,
			dailyOffer,
			weeklyOffer
		});
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getProduct = async (req, res) => {
	try {
		const product = await ProductModel.findById(req.query.id).select(
			'subcategories options numberOfsales name price year brand category description smalldescription createdAt updatedAt wifi bluetooth -_id'
		);
		if (!product) {
			return res.json({ failedMessage: 'Product not found with provided ID' });
		}
		return res.json({ product });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
