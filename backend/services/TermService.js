const BaseService = require('./BaseService');

const ObjectId = require('mongoose').Types.ObjectId;
const Term = require('../models/Terms');
const validateTerm = require('../validation/terms');

class TermService extends BaseService {
  constructor() {
    super(TermService);
  }

  async create(data) {
    const { term, text } = data;
    const { errors, isValid } = validateTerm(data);

    if (!isValid) return errors;

    await new Term({ term, text }).save();

    return { errors: null };
  }

  async findOne(id) {
    return await Term.findOne({ _id: new ObjectId(id) });
  }

  async findOneByTerm(id, term) {
    return await Term.findOne({
      _id: { $ne: new ObjectId(id) },
      term
    });
  }

  async findAll() {
    return await Term.find({});
  }

  async update(id, data) {
    return await TermsModel.updateOne({ _id: new ObjectId(id) }, data);
  }

  async delete(id) {
    return await Term.deleteOne({ _id: new ObjectId(id) });
  }
}

const TermServiceInstance = new TermService();

module.exports = TermServiceInstance;
