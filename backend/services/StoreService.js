const BaseService = require('./BaseService');
const ObjectId = require('mongoose').Types.ObjectId;
const Store = require('../models/Stores');
const { addStoreValidation } = require('../validation/stores');

class StoreService extends BaseService {
  constructor() {
    super(StoreService);
  }

  async findOne(id) {
    return await Store.findOne({ _id: new ObjectId(id) });
  }

  async findOneSelect() {
    return await Store.findOne({}).select(
      'address phone email links location -_id'
    );
  }

  async findAll() {
    return await Store.aggregate([
      { $match: {} },
      {
        $project: {
          address: 1,
          city: 1,
          country: 1,
          picture: 1,
          email: 1,
          phone: 1
        }
      }
    ]);
  }

  async findAllFront() {
    return await Store.aggregate([
      { $match: {} },
      {
        $group: {
          _id: { country: '$country', city: '$city' },
          stores: { $push: '$$ROOT' }
        }
      },
      { $group: { _id: '$_id.country', stores: { $push: '$$ROOT' } } },
      { $sort: { _id: 1 } }
    ]);
  }

  async validate(body, file, id) {
    return await addStoreValidation(body, file, id);
  }

  async create(data) {
    return await new Store({ ...data }).save();
  }

  async updateOne(id, data) {
    return await Store.updateOne({ _id: new ObjectId(id) }, data);
  }

  async deleteOne(id) {
    return await Store.deleteOne({ _id: new ObjectId(id) });
  }
}

const StoreServiceInstance = new StoreService();

module.exports = StoreServiceInstance;
