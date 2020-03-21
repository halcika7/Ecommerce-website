const BaseService = require('./BaseService');

const ObjectId = require('mongoose').Types.ObjectId;
const AnswerModel = require('../models/Answer');

class AnswerService extends BaseService {
  constructor() {
    super(AnswerService);
  }

  async createAnswer(question, answer) {
    await new AnswerModel({ question, answer }).save();
  }

  async findOneById(id) {
    return await AnswerModel.findOne({
      _id: new ObjectId(id)
    });
  }

  async findOneByQuestion(id, question) {
    return await AnswerModel.findOne({
      _id: { $ne: new ObjectId(id) },
      question
    });
  }

  async findAll() {
    return await AnswerModel.find({});
  }

  async deleteById(id) {
    return await AnswerModel.deleteOne({ _id: new ObjectId(id) });
  }

  async updateOne(id, question, answer) {
    return await AnswerModel.updateOne(
      { _id: new ObjectId(id) },
      { question, answer }
    );
  }
}

const AnswerServiceInstance = new AnswerService();

module.exports = AnswerServiceInstance;
