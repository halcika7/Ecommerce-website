const ObjectId = require('mongoose').Types.ObjectId;
const CouponModel = require('../models/Coupon');
const { validateCoupon } = require('../validation/coupon');

exports.addCoupon = async (req, res) => {
	const { errors, isValid } = await validateCoupon(req.body);
	if (!isValid) {
		return res.json(errors);
	}
	try {
		const name = req.body.name;
		const type = req.body.type;
		const expires = parseInt(req.body.expiresIn);
		const value = parseInt(req.body.value);
		const exparationDate = new Date();
		exparationDate.setDate(exparationDate.getDate() + expires);
		exparationDate.setHours(0, 0, 0, 0);

		const addCoupon = new CouponModel({ name, type, value, exparationDate });

		await addCoupon.save();

		return res.json({ successMessage: 'Coupon Added !' });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAllCoupons = async (req, res) => {
	try {
		const coupons = await CouponModel.find({});
		return res.json({ coupons });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getCoupon = async (req, res) => {
	try {
		const id = req.query.id;
		const coupon = await CouponModel.findOne({ _id: new ObjectId(id) });

		return res.json({ coupon });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteCoupon = async (req, res) => {
	try {
		const coupon = await CouponModel.deleteOne({
			_id: new ObjectId(req.query.id)
		});
		if(coupon.n === 0) { return res.json({ failedMessage: 'Coupon not deleted' }); }
		const coupons = await CouponModel.find({});
		return res.json({ successMessage: 'Coupon deleted', coupons });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.updateCoupon = async (req, res) => {
	try {
		const id = req.query.id;
		const type = req.query.type;
		const expiresIn = req.query.expiresIn;
		const value = req.query.value;
		const exparationDate = new Date();
		exparationDate.setDate(exparationDate.getDate() + expiresIn);
		exparationDate.setHours(0, 0, 0, 0);

		const updateCoupon = await CouponModel.updateOne(
			{ _id: new ObjectId(id) },
			{ exparationDate, type, value }
		);
		if (updateCoupon.nModified === 0) {
			return res.json({ failedMessage: 'Coupon not updated', coupon });
		}
		const coupon = await CouponModel.findOne({ _id: new ObjectId(id) });

		return res.json({ successMessage: 'Coupon Successfully updated', coupon });
	} catch (err) {
		if (err.errmsg) return res.json({ error: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
