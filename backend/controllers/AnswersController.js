const BaseController = require('./BaseController');
const AnswerService = require('../services/AnswerService');

const validateAddAnswer = require('../validation/answers');

class AnswerController extends BaseController {
  constructor() {
    super(AnswerController);
  }

  async addAnswer(req, res) {
    const { question, answer } = req.body;
    const { errors, isValid } = validateAddAnswer(req.body);

    if (!isValid) return super.sendResponse(res, 400, errors);

    try {
      await AnswerService.createAnswer(question, answer);

      return super.sendResponse(res, 200, { successMessage: 'Answer Added !' });
    } catch (err) {
      if (err.name === 'MongoError') {
        return super.sendResponse(res, 400, {
          errors: { question: 'Question must be unique' }
        });
      } else if (err.errmsg) {
        return super.sendResponse(res, 400, { failedMessage: err.errmsg });
      }
      return super.sendResponse(res, 400, { failedMessage: err.message });
    }
  }

  async getAnswer(req, res) {
    try {
      const answer = await AnswerService.findOneById(req.query.id);

      if (!answer) {
        return super.sendResponse(res, 404, {
          failedMessage: 'Answer not found'
        });
      }

      return super.sendResponse(res, 200, { answer });
    } catch (err) {
      if (err.errmsg)
        return super.sendResponse(res, 400, { failedMessage: err.errmsg });

      return super.sendResponse(res, 400, { failedMessage: err.message });
    }
  }

  async getAllAnswers(req, res) {
    try {
      const answers = await AnswerService.findAll();

      return super.sendResponse(res, 200, { answers });
    } catch (err) {
      if (err.errmsg)
        return super.sendResponse(res, 400, { failedMessage: err.errmsg });

      return super.sendResponse(res, 400, { failedMessage: err.message });
    }
  }

  async deleteAnswer(req, res) {
    try {
      const deleteAnswer = await AnswerService.deleteById(req.query.id);

      if (deleteAnswer.n === 0) {
        return super.sendResponse(res, 400, {
          failedMessage: 'Answer not deleted'
        });
      }

      const answers = await AnswerService.findAll();

      return super.sendResponse(res, 200, {
        successMessage: 'Answer Deleted',
        answers
      });
    } catch (err) {
      if (err.errmsg)
        return super.sendResponse(res, 400, { failedMessage: err.errmsg });

      return super.sendResponse(res, 400, { failedMessage: err.message });
    }
  }

  async updateAnswer(req, res) {
    try {
      const { id, object } = req.query;
      const { question, answer } = JSON.parse(object);

      const findAnswer = await AnswerService.findOneByQuestion(id, question);

      if (findAnswer) {
        return super.sendResponse(res, 400, {
          failedMessage: 'Question already answered !'
        });
      }

      const updateAnswer = await AnswerService.updateOne(id, question, answer);

      if (updateAnswer.nModified === 0) {
        return super.sendResponse(res, 400, {
          failedMessage: 'Answer not updated'
        });
      }

      const updatedAnswer = await AnswerService.findOneById(id);

      return super.sendResponse(res, 200, {
        successMessage: 'Answer Updated',
        answer: updatedAnswer
      });
    } catch (err) {
      if (err.errmsg)
        return super.sendResponse(res, 400, { failedMessage: err.errmsg });

      return super.sendResponse(res, 400, { failedMessage: err.message });
    }
  }
}

const AnswerControllerInstance = new AnswerController();

module.exports = AnswerControllerInstance;
