const BaseController = require('./BaseController');
const TermService = require('../services/TermService');

class TermController extends BaseController {
  constructor() {
    super(TermController);
  }

  async addTerm(req, res) {
    try {
      const { errors } = await TermService.create(req.body);

      if (errors) return res.json({ errors });

      return res.json({ successMessage: 'Term Added !' });
    } catch (err) {
      console.log(err);
      if (err.name === 'MongoError')
        return res.json({ errors: { question: 'Question must be unique' } });
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getTerm(req, res) {
    try {
      const term = await TermService.findOne(req.query.id);

      if (!term) {
        return res.json({ failedMessage: 'Answer not found' });
      }

      return res.json({ term });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllTerms(req, res) {
    try {
      const terms = await TermService.findAll();

      return res.json({ terms });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteTerm(req, res) {
    try {
      const deleted = await TermService.delete(req.query.id);

      if (deleted.n === 0) {
        return res.json({ failedMessage: 'No Terms deleted' });
      }

      const terms = await TermService.findAll();

      return res.json({ terms, successMessage: 'Term deleted' });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async updateTerm(req, res) {
    try {
      const id = req.query.id;
      const { term, text } = JSON.parse(req.query.object);

      const findTerm = await TermService.findOneByTerm(id, term);

      if (findTerm) {
        return res.json({ failedMessage: 'Term already added!' });
      }

      const updateTerm = await TermService.update(id, { term, text });

      if (updateTerm.nModified === 0) {
        return res.json({ failedMessage: 'Term not updated' });
      }

      const updatedTerm = await TermService.findOne(id);

      return res.json({ successMessage: 'Term Updated', term: updatedTerm });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const TermControllerInsatnce = new TermController();

module.exports = TermControllerInsatnce;
