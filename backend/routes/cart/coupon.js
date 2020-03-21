const express = require('express');
const router = express.Router();

const CouponController = require('../../controllers/CouponController');
const auth = require('../../middleware/auth');

// Coupon Routes
router.post('/addcoupon', (req, res, next) => auth(req, res, next, 'Create Coupons'), CouponController.addCoupon);
router.delete('/deletecoupon', (req, res, next) => auth(req, res, next, 'Delete Coupons'), CouponController.deleteCoupon);
router.get('/getcoupons', (req, res, next) => auth(req, res, next, 'Read Coupons'), CouponController.getAllCoupons);
router.get('/getcoupon', (req, res, next) => auth(req, res, next, 'Read Coupons'), CouponController.getCoupon);
router.patch('/updatecoupon', (req, res, next) => auth(req, res, next, 'Update Coupons'), CouponController.updateCoupon);

module.exports = router;
