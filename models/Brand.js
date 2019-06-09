const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	categories: [
		{
			type: String,
			required: true,
			index: true
		}
	]
});

BrandSchema.index({
	'$**': 'text'
});

module.exports = Brand = mongoose.model('brands', BrandSchema);
