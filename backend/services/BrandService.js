const BaseService = require('./BaseService');

const ObjectId = require('mongoose').Types.ObjectId;
const Brand = require('../models/Brand');

class BrandService extends BaseService {
  constructor() {
    super(BrandService);
  }

  async createBrand(name, categories) {
    return await new Brand({ name, categories }).save();
  }

  async getAll() {
    return await Brand.find({});
  }

  async getById(id) {
    return await Brand.findOne({
      _id: new ObjectId(id)
    }).select('name categories -_id');
  }

  async getByCategory(category) {
    return await await Brand.find({
      categories: { $in: category }
    }).select('name');
  }

  async updateOne(id, data) {
    return await Brand.updateOne({ _id: new ObjectId(id) }, { ...data });
  }

  async deleteOne(id) {
    return await Brand.deleteOne({
      _id: new ObjectId(id)
    });
  }

  async deleteMany(ids) {
    return await Brand.deleteMany({ _id: { $in: ids } });
  }
}

const BrandServiceInstance = new BrandService();

module.exports = BrandServiceInstance;
