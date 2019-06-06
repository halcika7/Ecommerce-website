const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermsSchema = new Schema({
	term: {
		type: String,
		required: true,
		unique: true
	},
	text: {
		type: String,
		required: true
	}
});

module.exports = Terms = mongoose.model('terms', TermsSchema);
