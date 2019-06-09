const ObjectId = require('mongoose').Types.ObjectId;
const CategoryModel = require('../models/Category');

exports.addCategory = async (req, res) => {
	try {
		if (req.body.subcategories.length < 1) {
			return res.json({ error: 'At least one subcategory required!' });
		}
		const category = new CategoryModel({
			name: req.body.name,
			icon: req.body.icon,
			subcategories: req.body.subcategories
		});
		await category.save();
		return res.json({ successMessage: 'Category Added !' });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await CategoryModel.find({});
		return res.json({ categories });
	} catch (err) {
		return res.json({ failedMessage: err.message });
	}
};

exports.getCategory = async (req, res) => {
	try {
		const category = await CategoryModel.findOne({
			_id: new ObjectId(req.query.id)
		}).select('name icon subcategories -_id');
		if (!category) {
			return res.json({
				error: `Category with id=${req.query.id} was not found !`
			});
		}
		return res.json({ category });
	} catch (err) {
		return res.json({ failedMessage: err.message });
	}
};

exports.editCategory = async (req, res) => {
	try {
		if (req.body.data.subcategories.length < 1) {
			return res.json({ error: 'At least one subcategory required!' });
		}
		await CategoryModel.updateOne(
			{ _id: new ObjectId(req.body.id) },
			{ ...req.body.data }
		);
		return res.json({ successMessage: 'Category Added !' });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const deletedCategory = await CategoryModel.deleteOne({
			_id: new ObjectId(req.query.id)
		});
		if (deletedCategory.n !== 1) {
			return res.json({
				failedMessage: 'Something happened and category was not deleted'
			});
		}
		return res.json({ successMessage: 'Category successfully deleted !' });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteManyCategories = async (req, res) => {
	const ids = Object.keys(req.query).map(id => req.query[id]);
	try {
		const categories = await CategoryModel.deleteMany({ _id: { $in: ids } });
		if (categories.n === 0) {
			return res.json({ failedMessage: 'No categories deleted !' });
		}
		if (categories.n === 1) {
			return res.json({ successMessage: 'One category deleted !' });
		}
		if (categories.n > 1) {
			return res.json({
				successMessage: `${categories.n} categories deleted !`
			});
		}
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
