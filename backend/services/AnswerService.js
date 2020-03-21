const BaseService = require('./BaseService');

const ObjectId = require('mongoose').Types.ObjectId;
const Answer = require('../models/Answer');

class AnswerService extends BaseService {
  constructor() {
    super(AnswerService);
  }

  async createAnswer(question, answer) {
    await new Answer({ question, answer }).save();
  }

  async findOneById(id) {
    return await Answer.findOne({
      _id: new ObjectId(id)
    });
  }

  async findOneByQuestion(id, question) {
    return await Answer.findOne({
      _id: { $ne: new ObjectId(id) },
      question
    });
  }

  async findAll() {
    return await Answer.find({});
  }

  async deleteById(id) {
    return await Answer.deleteOne({ _id: new ObjectId(id) });
  }

  async updateOne(id, question, answer) {
    return await Answer.updateOne(
      { _id: new ObjectId(id) },
      { question, answer }
    );
  }
}

const AnswerServiceInstance = new AnswerService();

module.exports = AnswerServiceInstance;
