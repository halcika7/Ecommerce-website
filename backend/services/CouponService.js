const BaseService = require('./BaseService');
const ObjectId = require('mongoose').Types.ObjectId;
const Coupon = require('../models/Coupon');

class CouponService extends BaseService {
  constructor() {
    super(CouponService);
  }

  async create(data) {
    return await new Coupon(data).save();
  }

  async getOne(id) {
    return await Coupon.findOne({
      _id: new ObjectId(id)
    });
  }

  async getAll() {
    return await Coupon.find({});
  }

  async updateOne(id, data) {
    return await Coupon.updateOne({ _id: new ObjectId(id) }, { ...data });
  }

  async delete(id) {
    return await Coupon.deleteOne({ _id: new ObjectId(id) });
  }
}

const CouponServiceInstance = new CouponService();

module.exports = CouponServiceInstance;
