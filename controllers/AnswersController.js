const ObjectId = require('mongoose').Types.ObjectId;
const AnswerModel = require('../models/Answer');
const validateAddAnswer = require('../validation/answers');

exports.addAnswer = async (req, res) => {
	const { errors, isValid } = validateAddAnswer(req.body);
	if (!isValid) { return res.json(errors); }
	const question = req.body.question,
		answer = req.body.answer;

	try {
		const addAnswer = new AnswerModel({ question, answer });
		await addAnswer.save();
		return res.json({ successMessage: 'Answer Added !' });
	} catch (err) {
		if (err.name === 'MongoError')
			return res.json({ errors: { question: 'Question must be unique' } });
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAnswer = async (req, res) => {
	try {
		const answer = await AnswerModel.findOne({
			_id: new ObjectId(req.query.id)
		});
		if (!answer) {
			return res.json({ failedMessage: 'Answer not found' });
		}
		return res.json({ answer });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAllAnswers = async (req, res) => {
	try {
		const answers = await AnswerModel.find({});
		return res.json({ answers });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteAnswer = async (req, res) => {
	try {
		const deleteAnswer = await AnswerModel.deleteOne({
			_id: new ObjectId(req.query.id)
		});
		if (deleteAnswer.n === 0) {
			return res.json({ failedMessage: 'Answer not deleted' });
		}

		const answers = await AnswerModel.find({});

		return res.json({ successMessage: 'Answer Deleted', answers });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.updateAnswer = async (req, res) => {
	try {
		const id = req.query.id;
		const { question, answer } = JSON.parse(req.query.object);
		const findAnswer = await AnswerModel.findOne({
			_id: { $ne: new ObjectId(id) },
			question
		});
		if (findAnswer) {
			return res.json({ failedMessage: 'Question already answered !' });
		}

		const updateAnswer = await AnswerModel.updateOne(
			{ _id: new ObjectId(id) },
			{ question, answer }
		);

		if(updateAnswer.nModified === 0) { return res.json({ failedMessage: 'Answer not updated' }); }

		const updatedAnswer = await AnswerModel.findOne({ _id: new ObjectId(id) });

		return res.json({
			successMessage: 'Answer Updated',
			answer: updatedAnswer
		});
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
