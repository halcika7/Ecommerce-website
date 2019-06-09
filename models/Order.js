const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		telephone: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		zip: {
			type: String,
			required: true
		},
		orderNotes: {
			type: String
		},
		payed: {
			type: Number,
			required: true
		},
		products: [
			{
				sku: {
					type: String,
					required: true
				},
				quantity: {
					type: Number,
					required: true
				},
				picture: {
					type: String,
					required: true
				},
				name: {
					type: String,
					required: true
				},
				options: {}
			}
		],
		coupon: {
			applied: {
				type: Boolean,
				required: true
			},
			code: {
				type: String
			},
			couponType: {
				type: String
			},
			value: {
				type: Number
			}
		},
		shipped: {
			type: Boolean,
			default: false
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = Order = mongoose.model('orders', OrderSchema);
