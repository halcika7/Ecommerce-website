const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');
const CouponModel = require('../models/Coupon');

const BaseController = require('./BaseController');

class DashboardController extends BaseController {
  constructor() {
    super(DashboardController);
  }

  async dashboard(req, res) {
    try {
      const numberOfProducts = await ProductModel.find({}).countDocuments();
      const numberOfOrders = await OrderModel.find({}).countDocuments();
      const numberOfActiveCoupons = await CouponModel.find({
        exparationDate: { $gt: new Date() }
      }).countDocuments();
      const numberOfSoldProducts = await ProductModel.aggregate([
        { $match: {} },
        { $group: { _id: null, n: { $sum: '$numberOfsales' } } }
      ]);

      const latestTransactions = await OrderModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $limit: 10 },
        {
          $project: {
            shipped: 1,
            userId: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            payed: 1
          }
        }
      ]);

      const bestSellingProducts = await ProductModel.aggregate([
        { $match: { numberOfsales: { $gt: 0 } } },
        { $sort: { numberOfsales: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: 1,
            numberOfsales: 1,
            category: 1,
            brand: 1,
            featuredPicture: {
              $arrayElemAt: ['$options.featuredPicture', 0]
            }
          }
        }
      ]);

      return res.json({
        numberOfProducts,
        numberOfOrders,
        numberOfActiveCoupons,
        numberOfSoldProducts,
        latestTransactions,
        bestSellingProducts,
        successMessage: 'Success Message'
      });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const DashboardControllerInstance = new DashboardController();

module.exports = DashboardControllerInstance;
