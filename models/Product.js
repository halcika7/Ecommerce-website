const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
		brand: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
    },
    published: {
			type: Boolean,
      required: true,
      default: false
    },
    featured: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
			type: String,
			required: true
    },
    smalldescription: {
			type: String,
			required: true
    },
    subcategories: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    dailyOffer: {
      active: {
        type: Boolean
      },
      expires: {
        type: Date
      },
      discount: Number
    },
    weeklyOffer: {
      active: {
        type: Boolean
      },
      expires: {
        type: Date
      },
      discount: Number
    },
    numberOfsales: {
      type: Number,
      required: true,
      default: 0
    }
	},
	{
		timestamps: true
	}
);

module.exports = User = mongoose.model('products', ProductSchema);
