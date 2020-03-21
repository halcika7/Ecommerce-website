const BaseService = require('./BaseService');
const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../models/Category');

class CategoryService extends BaseService {
  constructor() {
    super(CategoryService);
  }

  async create(name, icon, subcategories) {
    return await new Category({ name, icon, subcategories }).save();
  }

  async getAll() {
    return await Category.find({});
  }

  async getById(id) {
    return await Category.findOne({
      _id: new ObjectId(id)
    }).select('name icon subcategories -_id');
  }

  async getManyByIcon(iconNames) {
    return await Category.find({ icon: { $in: iconNames } });
  }

  async getByIcon(icon) {
    return await Category.findOne({ icon });
  }

  async update(id, data) {
    return await Category.updateOne({ _id: new ObjectId(id) }, { ...data });
  }

  async updateByIcon(icon, name) {
    return await Category.updateOne({ icon }, { icon: name });
  }

  async delete(id) {
    return await Category.deleteOne({
      _id: new ObjectId(id)
    });
  }

  async deleteMany(ids) {
    return await Category.deleteMany({ _id: { $in: ids } });
  }
}

const CategoryServiceInstance = new CategoryService();

module.exports = CategoryServiceInstance;
