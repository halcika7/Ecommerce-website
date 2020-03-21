const BaseService = require('./BaseService');
const ObjectId = require('mongoose').Types.ObjectId;
const Icon = require('../models/CategoryIcon');
const Category = require('../models/Category');
const validateIcon = require('../helpers/iconshelper').validateicon;

class CategoryIconService extends BaseService {
  constructor() {
    super(CategoryIconService);
  }

  async create(name) {
    return await new Icon({ name }).save();
  }

  async getAll() {
    return await Icon.find({});
  }

  async getSelectOne(id) {
    return await Icon.findOne({
      _id: new ObjectId(id)
    }).select('name -_id');
  }

  async getOne(id) {
    return await Icon.findOne({
      _id: new ObjectId(id)
    });
  }

  async getManyIds(ids) {
    return await Icon.find({ _id: { $in: ids } });
  }

  async updateOne(id, name) {
    return await Icon.updateOne({ _id: new ObjectId(id) }, { name });
  }

  async delete(id) {
    return await Icon.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteMany(ids, names) {
    return await Icon.deleteMany({
      _id: { $in: ids },
      name: { $nin: names }
    });
  }
}

const CategoryIconServiceInstance = new CategoryIconService();

module.exports = CategoryIconServiceInstance;
