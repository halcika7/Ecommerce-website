const ObjectId = require('mongoose').Types.ObjectId;
const TermsModel = require('../models/Terms');
const validateTerm = require('../validation/terms');

exports.addTerm = async (req, res) => {
    const { errors, isValid } = validateTerm(req.body);
	if (!isValid) { return res.json(errors);}

	const {term, text} = req.body;

	try {
		const addTerm = new TermsModel({ term, text });
		await addTerm.save();
		return res.json({ successMessage: 'Term Added !' });
	} catch (err) {
        console.log(err);
        if(err.name === 'MongoError') return res.json({ errors: {question:'Question must be unique'} });
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getTerm = async (req, res) => {
	try {
		const term = await TermsModel.findOne({ _id: new ObjectId(req.query.id) });
		if(!term) {
			return res.json({ failedMessage: 'Answer not found' });
		}
		return res.json({ term});
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getAllTerms = async (req, res) => {
  try {
    const terms = await TermsModel.find({});
    return res.json({ terms });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteTerm = async (req, res) => {
	try {
		const deleted = await TermsModel.deleteOne({ _id: new ObjectId(req.query.id) });
		if(deleted.n === 0) { return res.json({ failedMessage: 'No Terms deleted' }); }
		const terms = await TermsModel.find({});
		
	} catch(err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    	return res.json({ failedMessage: err.message });
	}
}

exports.updateTerm = async (req, res) => {
	try {
		const id = req.query.id;
		const { term, text } = JSON.parse(req.query.object);
		const findTerm = await TermsModel.findOne({ _id: {$ne: new ObjectId(id)}, term });
		if(findTerm) {
			return res.json({failedMessage: 'Term already added!'});
		}

		await TermsModel.updateOne({ _id: new ObjectId(id) }, { term, text });

		const updatedTerm = await TermsModel.findOne({ _id: new ObjectId(id) });

		return res.json({ successMessage: 'Term Updated', term: updatedTerm })

	} catch(err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
        return res.json({ failedMessage: err.message });
	}

}

