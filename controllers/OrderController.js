const ObjectId = require('mongoose').Types.ObjectId;
const OrderModel = require('../models/Order');

exports.getAllUserOrders = async (req, res) => {
	try {
		const orders = await OrderModel.aggregate([
			{ $match: { userId: new ObjectId(req.query.id), show: true } },
			{
				$project: {
					payed: 1,
					shipped: 1,
					products: { $size: '$products' }
				}
			}
		]);

		return res.json({ orders });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getOrder = async (req, res) => {
	try {
		const order = await OrderModel.findOne({ _id: new ObjectId(req.query.id) });
		if (!order) {
			return res.json({ failedMessage: 'Order not found' });
		}
		return res.json({ order });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteUserOrder = async (req, res) => {
	try {
		const updated = await OrderModel.updateOne(
			{ _id: new ObjectId(req.query.id) },
			{ show: false }
		);
		if (updated.nModified === 0) {
			return res.json({ failedMessage: 'Order not deleted' });
		}
		const orders = await OrderModel.find({
			userId: new ObjectId(req.query.userId),
			show: true
		});
		return res.json({ successMessage: 'Order Deleted', orders });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await OrderModel.find({});
		return res.json({ orders });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteOrder = async (req, res) => {
	try {
		if (!req.query.id) {
			return res.json({ failedMessage: 'Id not provided' });
		}
		const deleted = await OrderModel.deleteOne({
			_id: new ObjectId(req.query.id)
		});
		if (deleted.n === 0) {
			return res.json({ failedMessage: 'Order not deleted' });
		}
		const orders = await OrderModel.find({});
		return res.json({ successMessage: 'Order Deleted', orders });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.updateOrder = async (req, res) => {
	try {
		if (!req.query.id) {
			return res.json({ failedMessage: 'ID not provided' });
		}
		if (!req.query.value) {
			return res.json({ failedMessage: 'Value not provided' });
		}
		const updated = await OrderModel.updateOne(
			{ _id: new ObjectId(req.query.id) },
			{ shipped: req.query.value }
		);
		if (updated.nModified === 0) {
			return res.json({ failedMessage: 'Nothing updated' });
		}
		return res.json({ successMessage: 'Order Updated' });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
