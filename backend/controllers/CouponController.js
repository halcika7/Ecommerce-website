const { validateCoupon } = require('../validation/coupon');

const BaseControler = require('./BaseController');
const CouponService = require('../services/CouponService');

class CouponController extends BaseControler {
  constructor() {
    super(CouponController);
  }

  async addCoupon(req, res) {
    try {
      const { name, type, value, expiresIn } = req.body;
      const { errors, isValid } = await validateCoupon(req.body);

      if (!isValid) return res.json(errors);

      const expires = parseInt(expiresIn);
      const exparationDate = new Date();
      exparationDate.setDate(exparationDate.getDate() + expires);
      exparationDate.setHours(0, 0, 0, 0);

      await CouponService.create({
        name,
        type,
        value,
        exparationDate
      });

      return res.json({ successMessage: 'Coupon Added !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllCoupons(req, res) {
    try {
      const coupons = await CouponService.getAll();

      return res.json({ coupons });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getCoupon(req, res) {
    try {
      const coupon = await CouponService.getOne(req.query.id);

      return res.json({ coupon });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteCoupon(req, res) {
    try {
      const coupon = await CouponService.delete(req.query.id);

      if (coupon.n === 0) {
        return res.json({ failedMessage: 'Coupon not deleted' });
      }

      const coupons = await CouponService.getAll();

      return res.json({ successMessage: 'Coupon deleted', coupons });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async updateCoupon(req, res) {
    try {
      const { id, type, expiresIn, value } = req.query;
      const exparationDate = new Date();
      exparationDate.setDate(exparationDate.getDate() + expiresIn);
      exparationDate.setHours(0, 0, 0, 0);

      const updateCoupon = await CouponService.updateOne(id, {
        exparationDate,
        type,
        value
      });

      if (updateCoupon.nModified === 0) {
        return res.json({ failedMessage: 'Coupon not updated', coupon });
      }

      const coupon = await CouponService.getOne(id);

      return res.json({
        successMessage: 'Coupon Successfully updated',
        coupon
      });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const CouponControllerInstance = new CouponController();

module.exports = CouponControllerInstance;
