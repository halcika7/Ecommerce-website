const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	question: {
		type: String,
		required: true,
		unique: true
	},
	answer: {
		type: String,
		required: true
	}
});

module.exports = Answer = mongoose.model('answers', AnswerSchema);
