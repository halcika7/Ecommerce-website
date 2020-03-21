const BaseService = require('./BaseService');
const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../models/Order');

class OrderService extends BaseService {
  constructor() {
    super(OrderService);
  }

  async getOne(id) {
    return await Order.findOne({
      _id: new ObjectId(id)
    });
  }

  async getAll() {
    return await Order.find({});
  }

  async getUserOrders(userId) {
    return await Order.aggregate([
      { $match: { userId: new ObjectId(userId), show: true } },
      {
        $project: {
          payed: 1,
          shipped: 1,
          products: { $size: '$products' }
        }
      }
    ]);
  }

  async hideOne(id) {
    return await Order.updateOne({ _id: new ObjectId(id) }, { show: false });
  }

  async updateOne(id, shipped) {
    return await Order.updateOne({ _id: new ObjectId(id) }, { shipped });
  }

  async deleteOne(id) {
    return await Order.deleteOne({
      _id: new ObjectId(id)
    });
  }
}

const OrderServiceInstance = new OrderService();

module.exports = OrderServiceInstance;
