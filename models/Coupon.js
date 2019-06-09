const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		default: 'percent'
	},
	value: {
		type: Number,
		required: true
	},
	exparationDate: {
		type: Date,
		default: Date.now(),
		required: true
	}
});

module.exports = Coupon = mongoose.model('coupons', CouponSchema);
